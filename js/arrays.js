function removeAll() {
	$('div.array-container').remove();
}


function displayArray(arr) {
    removeAll();
	let $arrayContainer = $("<div></div>").addClass("array-container");
	for (i of arr) {
		let $value = $("<p></p>").text(i);
		let $element = $("<div></div>").addClass("array-element");
		$arrayContainer.append($element.append($value));
	}
	$("section.animation-zone").append($arrayContainer);

	function center() {
		$arrayContainer.css(
			"left",
			$("section.animation-zone").width() / 2 -
				$arrayContainer.width() / 2 +
				"px"
		);
	}
	center();
    $(window).resize(center);
    
    return $arrayContainer;
}


function parse(str) {
    let replaced = str.replace(/\s/g, '');
    return JSON.parse(replaced);
}