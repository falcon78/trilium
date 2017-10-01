// hot keys are active also inside inputs and content editables
jQuery.hotkeys.options.filterInputAcceptingElements = true;
jQuery.hotkeys.options.filterContentEditable = true;

$(document).bind('keydown', 'alt+m', function() {
    const toggle = $(".hide-toggle");
    const hidden = toggle.css('display') === 'none';

    toggle.css('display', hidden ? 'block' : 'none');

    $("#noteDetailWrapper").css("width", hidden ? "750px" : "100%");
});

$(document).bind('keydown', 'alt+s', function() {
    $("input[name=search]").focus();
});

// hide (toggle) everything except for the note content for distraction free writing
$(document).bind('keydown', 'alt+t', function() {
    const date = new Date();
    const dateString = formatDateTime(date);

    $('#noteDetail').summernote('insertText', dateString);
});

$(window).on('beforeunload', function(){
    // this makes sure that when user e.g. reloads the page or navigates away from the page, the note's content is saved
    // this sends the request asynchronously and doesn't wait for result
    saveNoteIfChanged();
});

// Overrides the default autocomplete filter function to search for matched on atleast 1 word in each of the input term's words
$.ui.autocomplete.filter = function (array, terms) {
    if (!terms) {
        return [];
    }

    const startDate = new Date();

    const results = [];
    const tokens = terms.toLowerCase().split(" ");

    for (const item of array) {
        let found = true;
        const lcValue = item.value.toLowerCase();

        for (const token of tokens) {
            if (lcValue.indexOf(token) === -1) {
                found = false;
                break;
            }
        }

        if (found) {
            results.push(item);
        }
    }

    console.log("Search took " + (new Date().getTime() - startDate.getTime()) + "ms");

    return results;
};