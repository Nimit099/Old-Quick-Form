({
    //=====================Copy text  to clipboard button on button click====================
    copyTextFieldHelper: function(component, event, text) {
        try {
            var hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("value", text);
            document.body.appendChild(hiddenInput);
            hiddenInput.select();
            document.execCommand("copy");
            document.body.removeChild(hiddenInput);
            var copied = document.querySelector('.urlCopied');
            copied.style.display = 'block';
            setTimeout(function() { copied.style.display = 'none'; }, 1500);

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    },

})