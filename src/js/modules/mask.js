const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos); //set cursor in the position
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true); //join the end points of the range
            range.moveEnd('character', pos); //the end point
            range.moveStart('character', pos); //the start point
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___)-___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''), //from matrix
            val = this.value.replace(/\D/g, ''); //from input

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') { //input is unfocused
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;