// master tag list, will contain 3 arrays of tags
var tags = [];
tags.availableTags = [];
tags.originalTags = [];
tags.assignedTags = [];

(function ($) {

    $.fn.tagHandler = function (options) {
        var opts = $.extend({}, $.fn.tagHandler.defaults, options);
        tagDebug($(this), opts);

        // processes each specified object and adds a tag handler to each
        return this.each(function () {
            // checks to make sure the supplied element is a <ul>
            if (!$(this).is('ul')) {
                next;
            }

            // adds an id to the tagContainer in case it doesn't have one
            if (!this.id) {
                var d = new Date();
                this.id = d.getTime();
            }

            var tagContainer = this;

            // wraps the <ul> element in a div mainly for use in positioning
            // the save button and loader image.
            $(tagContainer).wrap('<div class="' + opts.className + '" />');

            // adds the the tag class to the tagContainer and creates the tag
            // input field
            $(tagContainer).addClass(opts.className + "Container");
            if (opts.allowEdit) {
                $(tagContainer).html('<li class="tagInput"><input class="tagInputField" type="text" /></li>');
            }
            var inputField = $(tagContainer).find(".tagInputField");
            // adds a save/loader divs to the tagContainer if needed
            if (opts.updateURL != '') {
                if (!opts.autoUpdate) {
                    $("<div />").attr({ id: tagContainer.id + "_save", title: "Save Tags" }).addClass("tagUpdate").click(function () {
                        saveTags(tags, opts, tagContainer.id);
                    }).appendTo($(tagContainer).parent());
                }
                $("<div />").attr({ id: tagContainer.id + "_loader", title: "Saving Tags" }).addClass("tagLoader").appendTo($(tagContainer).parent());
            }

            // initializes the tag lists
            // tag lists will be pulled from a URL, or passed lists of tags
            if (opts.getURL != '') {
                $.ajax({
                    url: opts.getURL,
                    cache: false,
                    data: opts.getData,
                    dataType: 'json',
                    success: function (data, text, xhr) {
                        if (data.length) {
                            tags.availableTags = data.slice();
                        }
//                        if (data.assignedTags.length) {
//                            tags.originalTags = data.assignedTags.slice();
//                        }
                        if (opts.sortTags) {
                            tags = sortTags(tags);
                        }
//                        if (data.assignedTags.length) {
//                            tags.assignedTags = data.assignedTags.slice();
//                            if (opts.sortTags) {
//                                tags = sortTags(tags);
//                            }


//                            // adds any already assigned tags to the tag box
//                            for (var x = 0; x < tags.assignedTags.length; x++) {
//                                if (opts.allowEdit) {
//                                    $("<li />").addClass("tagItem").html(tags.assignedTags[x]).insertBefore($(inputField).parent());
//                                } else {
//                                    $("<li />").addClass("tagItem").css("cursor", "default").html(tags.assignedTags[x]).appendTo($(tagContainer));
//                                }
//                                tags.availableTags = removeTagFromList(tags.assignedTags[x], tags.availableTags);
//                            }
//                        }
                        if (opts.autocomplete && opts.allowEdit) {
                            $(inputField).autocomplete("option", "source", tags.availableTags);
                        }
                    },
                    error: function (xhr, text, error) {
                        alert("There was an error getting the tag list.");
                    }
                });
            } else {
                if (opts.availableTags.length) {
                    tags.availableTags = opts.availableTags.slice();
                }
                if (opts.originalTags.length) {
                    tags.originalTags = opts.originalTags.slice();
                }
                if (opts.sortTags) {
                    tags = sortTags(tags);
                }
                if (opts.assignedTags.length) {
                    tags.assignedTags = opts.assignedTags.slice();
                    if (opts.sortTags) {
                        tags = sortTags(tags);
                    }

                    // adds any already assigned tags to the tag box
                    for (var x = 0; x < tags.assignedTags.length; x++) {
                        if (opts.allowEdit) {
                            $("<li />").addClass("tagItem").html(tags.assignedTags[x]).insertBefore($(inputField).parent());
                        } else {
                            $("<li />").addClass("tagItem").css("cursor", "default").html(tags.assignedTags[x]).appendTo($(tagContainer));
                        }
                        tags.availableTags = removeTagFromList(tags.assignedTags[x], tags.availableTags);
                    }
                }
                if (opts.autocomplete && opts.allowEdit) {
                    $(inputField).autocomplete("option", "source", tags.availableTags);
                }
            }

            // all tag editing functionality only activated if set in options
            if (opts.allowEdit) {
                // delegates a click event function to all future <li> elements with
                // the tagItem class that will remove the tag upon click
                $(tagContainer).delegate("#" + this.id + " li.tagItem", "click",
                function () {
                    tags = removeTag($(this), tags, opts.sortTags);
                    if (opts.updateURL != '' && opts.autoUpdate) {
                        saveTags(tags, opts, tagContainer.id);
                    }
                    if (opts.autocomplete) {
                        $(inputField).autocomplete("option", "source", tags.availableTags);
                    }
                });

                // checks the keypress event for enter or comma, and adds a new tag
                // when either of those keys are pressed
                $(inputField).keypress(function (e) {
                    if (e.which == 13 || e.which == 44 || e.which == opts.delimiter.charCodeAt(0)) {
                        e.preventDefault();
                        if ($(this).val() != "" && !checkTag($.trim($(this).val()), tags.assignedTags)) {
                            tags = addTag(this, $.trim($(this).val()), tags, opts.sortTags);
                            if (opts.updateURL != '' && opts.autoUpdate) {
                                saveTags(tags, opts, tagContainer.id);
                            }
                            if (opts.autocomplete) {
                                $(inputField).autocomplete("option", "source", tags.availableTags);
                            }
                            $(this).val("");
                            $(this).focus();
                        }
                    }
                });

                // checks the keydown event for the backspace key as checking the
                // keypress event doesn't work in IE
                $(inputField).keydown(function (e) {
                    if (e.which == 8 && $(this).val() == "") {
                        tags = removeTag($(tagContainer).find(".tagItem:last"), tags, opts.sortTags);
                        if (opts.updateURL != '' && opts.autoUpdate) {
                            saveTags(tags, opts, tagContainer.id);
                        }
                        if (opts.autocomplete) {
                            $(inputField).autocomplete("option", "source", tags.availableTags);
                        }
                        $(this).focus();
                    }
                });

//                                // adds autocomplete functionality for the tag names
//                                if (opts.autocomplete) {
//                                    $(inputField).autocomplete({
//                                        source: tags.availableTags,
//                                        select: function (event, ui) {
//                                            if (!checkTag($.trim(ui.item.value), tags.assignedTags)) {
//                                                tags = addTag(this, $.trim(ui.item.value), tags, opts.sortTags);
//                                                if (opts.updateURL != '' && opts.autoUpdate) {
//                                                    saveTags(tags, opts, tagContainer.id);
//                                                }
//                                                $(inputField).autocomplete("option", "source", tags.availableTags);
//                                                $(this).focus();
//                                            }
//                                            $(this).val("");
//                                            return false;
//                                        },
//                                        minLength: 0
//                                    });
//                                }



                // sets the input field to show the autocomplete list on focus
                // when there is no value
                $(inputField).focus(function () {
                    if ($(inputField).val() == "" && opts.autocomplete) {
                        $(inputField).autocomplete("search", "");
                    }
                });

                // sets the focus to the input field whenever the user clicks
                // anywhere on the tagContainer -- since the input field by default
                // has no border it isn't obvious where to click to access it
                $(tagContainer).click(function () {
                    $(inputField).focus();
                });
            }
        });
    };

    // plugin option defaults
    $.fn.tagHandler.defaults = {
        allowEdit: true,
        assignedTags: [],
        autocomplete: false,
        autoUpdate: false,
        availableTags: [],
        className: 'tagHandler',
        debug: false,
        delimiter: '',
        getData: '',
        getURL: '',
        sortTags: true,
        updatetData: '',
        updateURL: ''
    };

    // checks to to see if a tag is already found in a list of tags
    function checkTag(value, tags) {
        var check = false;
        for (var x = 0; x < tags.length; x++) {
            if (tags[x] == value) {
                check = true;
                break;
            }
        }

        return check;
    }

    // removes a tag from a tag list
    function removeTagFromList(value, tags) {
        for (var x = 0; x < tags.length; x++) {
            if (tags[x] == value) {
                tags.splice(x, 1);
            }
        }

        return tags;
    }

    // adds a tag to the tag box and the assignedTags list
    function addTag(tagField, value, tags, sort) {
        tags.assignedTags.push(value);
        tags.availableTags = removeTagFromList(value, tags.availableTags);
        $("<li />").addClass("tagItem").html(value).insertBefore($(tagField).parent());

        if (sort) {
            tags = sortTags(tags);
        }
        return tags;
    }

    // removes a tag from the tag box and the assignedTags list
    function removeTag(tag, tags, sort) {
        var value = $(tag).html();
        tags.assignedTags = removeTagFromList(value, tags.assignedTags);
        if (checkTag(value, tags.originalTags)) {
            tags.availableTags.push(value);
        }
        $(tag).remove();

        if (sort) {
            tags = sortTags(tags);
        }
        return tags;
    }

    // sorts each of the sets of tags
    function sortTags(tags) {
        tags.availableTags = tags.availableTags.sort();
        tags.assignedTags = tags.assignedTags.sort();
        tags.originalTags = tags.originalTags.sort();

        return tags;
    }

    // saves the tags to the server via ajax
    function saveTags(tags, opts, tcID) {
        sendData = {
            allTags: tags.assignedTags,
            prevTags: tags.originalTags
        };
        $.extend(sendData, opts.updateData);
        $.ajax({
            type: 'POST',
            url: opts.updateURL,
            cache: false,
            data: sendData,
            dataType: 'json',
            traditional: true,
            beforeSend: function () {
                if ($("#" + tcID + "_save").length) {
                    $("#" + tcID + "_save").fadeOut(200,
                    function () {
                        $("#" + tcID + "_loader").fadeIn(200);
                    });
                } else {
                    $("#" + tcID + "_loader").fadeIn(200);
                }
            },
            complete: function () {
                $("#" + tcID + "_loader").fadeOut(200,
                function () {
                    if ($("#" + tcID + "_save").length) {
                        $("#" + tcID + "_save").fadeIn(200);
                    }
                });
            }
        });
    }

    // some debugging information
    function tagDebug(tagContainer, options) {
        if (window.console && window.console.log && options.debug) {
            window.console.log(tagContainer);
            window.console.log(options);
            window.console.log($.fn.tagHandler.defaults);
        }
    }

})(jQuery);