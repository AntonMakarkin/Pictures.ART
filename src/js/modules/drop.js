const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    //dragenter - object above the dropArea
    //dragleave - object outside the dropArea
    //dragover - object freezes above the dropArea
    //drop - object is sent in the dropArea

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.background = "rgba(0, 0, 0, .7)";
    }

    function unhighLight(item) {
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if(item.closest('.parent_upload')) {
            //item.closest('.file_upload').style.background = "#ededed";
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.background = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files; //add file
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name; //get name-block (neighboor/sibling of input)
        });
    });

};

export default drop;