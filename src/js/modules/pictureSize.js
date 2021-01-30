const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block) {
        const img = block.querySelector('img');
        img.classList.add('animated', 'fadeIn');
        img.src = img.src.slice(0, -4) + '-1.png'; //cut 4 symbols from the end and add an img
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }

    function hideImg(block) {
        const img = block.querySelector('img');
        img.classList.remove('animated', 'fadeIn');
        img.src = img.src.slice(0, -6) + '.png'; //cut 6 symbols from the end and add the clear img
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });

};

export default pictureSize;