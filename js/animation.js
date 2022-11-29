const sideMargin = 20;
const topMargin = 20;
let timeout = getTimeout();

function createSubArr(arr, from, to) {
    let container = $('<div></div>').addClass('array-container');
    for (let i = from; i < to; i++) {
        let value = $('<p></p>').text($(arr.childNodes[i]).text());
        let element = $('<div></div>').addClass('array-element');
        container.append(element.append(value));
    }
    return container[0];
}


function divideSubArr(half, dir) {
    return new Promise(resolve => {
        half.animate({
            transform: [
                `translate(${dir}10px, ${-$(half).height() - topMargin}px)`,
                'translate(0, 0)'
            ]
        }, timeout.value);
        setTimeout(() => {
            resolve();
        }, timeout.value);
    });
}


function mergeElementIntoParentArr(element, target) {
    return new Promise(resolve => {
        element.animate({
            transform: [
                'translate(0, 0)',
                `translate(
                    ${$(target).offset().left - $(element).offset().left}px,
                    ${$(target).offset().top - $(element).offset().top}px
                )`
            ]
        }, timeout.value); 

        setTimeout(() => {
            $(target).html($(element).html());
            $(element).css('opacity', '0');
            $(target).css("background", "#00FBD6");
            resolve();
        }, timeout.value);
    });
}


async function merge(subArr1, subArr2, target) {
    let i1 = 0, i2 = 0, i3 = 0;
    while (i1 < subArr1.childNodes.length && i2 < subArr2.childNodes.length) {
        let value1 = parseInt($(subArr1.childNodes[i1]).text());
        let value2 = parseInt($(subArr2.childNodes[i2]).text());
        if (value1 < value2) 
            await mergeElementIntoParentArr(
                subArr1.childNodes[i1++], target.childNodes[i3++]
            );
        else 
            await mergeElementIntoParentArr(
                subArr2.childNodes[i2++], target.childNodes[i3++]
            );    
    }
    while (i1 < subArr1.childNodes.length) 
        await mergeElementIntoParentArr(
            subArr1.childNodes[i1++], target.childNodes[i3++]
        );
    while (i2 < subArr2.childNodes.length) 
        await mergeElementIntoParentArr(
            subArr2.childNodes[i2++], target.childNodes[i3++]
        );
}


async function sort(arr) {
    if (arr.childNodes.length <= 1)
        return;

    let middle = Math.floor(arr.childNodes.length / 2);
    let subArr1 = createSubArr(arr, 0, middle);
    let subArr2 = createSubArr(arr, middle, arr.childNodes.length);

    $('section.animation-zone').append(subArr1);
    $(subArr1).css({
        'left': `${$(arr).position().left - sideMargin}px`,
        'top': `${$(arr).position().top + $(arr).height() + topMargin}px`
    });
    await divideSubArr(subArr1, '+', topMargin);

    $('section.animation-zone').append(subArr2);
    $(subArr2).css({
        'left': `${$(subArr1).position().left + $(subArr1).width() + sideMargin * 2}px`,
        'top': `${$(subArr1).position().top}px`
    });
    await divideSubArr(subArr2, '-', topMargin);


    await sort(subArr1);
    await sort(subArr2);

    await merge(subArr1, subArr2, arr);
}


