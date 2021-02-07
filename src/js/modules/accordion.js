const accordion = (triggersSelector) => { //check main.css on 921
    const btns = document.querySelectorAll(triggersSelector),
          blocksSelector = "." + btns[1].nextElementSibling.classList.item(2),
          blocks = document.querySelectorAll(blocksSelector);
          console.log(blocks);

    btns.forEach((btn, i) => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                btns.forEach(btn => { //make all buttons inactive
                    btn.classList.remove('active-style');
                });
                this.classList.add('active-style'); //except this button where was a click
                blocks.forEach(block => { //make all textblocks hidden
                    block.classList.remove('active-content');
                    block.style.maxHeight = '0px';
                });
                this.nextElementSibling.classList.add('active-content'); //except which we want to show
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordion;