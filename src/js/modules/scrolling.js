const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    //Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'), //all links which start from #
        speed = 0.25;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let scrollTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top, 
                start = null;
            
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start, //toBlock < 0 when this element is higher than clientHeight 
                    pixels = (toBlock < 0 ? Math.max(scrollTop - progress/speed, scrollTop + toBlock) : Math.min(scrollTop + 
                    progress/speed, scrollTop + toBlock));
                    console.log(toBlock);

                    document.documentElement.scrollTo(0, pixels);

                    if (pixels != scrollTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }

            }
        });
    });

    //Pure js scrolling
    /*const element = document.documentElement,
          body = document.body;

    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (this.hash !== '') {
                event.preventDefault();
                let hashElement = document.querySelector(this.hash),
                    hashElementTop = 0;

                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent; //check if it exists, if not, then the variable become false
                }

                hashElementTop = Math.round(hashElementTop);

                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }

        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            
            if (
                prevScrollTop === scrollTop || 
                (to > from && scrollTop >= to) || 
                (to < from && scrollTop <= to)
            ) { //it means that we've reached the block we need
                clearInterval(move);
                //method for changing the currrent write in history (for changing URL without reloading)
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); //replace all # in url string and add our hash
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    calcScroll();*/
};

export default scrolling;