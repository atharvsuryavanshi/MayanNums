const mayanNumerals = {
    '0': '𝋠', '1': '𝋡', '2': '𝋢', '3': '𝋣', '4': '𝋤',
    '5': '𝋥', '6': '𝋦', '7': '𝋧', '8': '𝋨', '9': '𝋩',
    'A': '𝋪', 'B': '𝋫', 'C': '𝋬', 'D': '𝋭', 'E': '𝋮',
    'F': '𝋯', 'G': '𝋰', 'H': '𝋱', 'I': '𝋲', 'J': '𝋳',
}

// *
function decimalToBase20(decimalStr) {
    const base20Chars = '0123456789ABCDEFGHIJ';
    let decimalNum = parseInt(decimalStr, 10);
    if (decimalNum === 0) return '0';
    let base20Str = '';
    while (decimalNum > 0) {
        let remainder = decimalNum % 20;
        base20Str = base20Chars[remainder] + base20Str;
        decimalNum = Math.floor(decimalNum / 20);
    }
    return base20Str;
}

// console.log(decimalToBase20('12345'));

function base20ToMayan(base20Str, horizontal = false) {
    let mayanStr = '';
    let digitSeperator = '\n';
    if (horizontal) {
        digitSeperator = '';
    }
    for (let digit of base20Str) {
        mayanStr += mayanNumerals[digit] + digitSeperator;
    }
    return mayanStr;
}

console.log(base20ToMayan(decimalToBase20(203)));

let inputDecimal = $('#input-decimal');
let inputSwitchHorizontal = $('#input-switch-horizontal');
let buttonConvert = $('#button-convert');
let buttonCopy = $('#button-copy');
let spanIpDecimal = $('#span-ip-decimal');
let textareaOpResult = $('#textarea-op-result');
let divOpResult = $('#div-op-result');

$(document).ready(function () {
    // *
    inputDecimal.on('input', function () {
        let inputVal = $(this).val();
        let filteredVal = inputVal.replace(/[^0-9]/g, '');
        if (filteredVal.length > 10) {
            filteredVal = filteredVal.slice(0, 12);
        }
        $(this).val(filteredVal);
    });

    inputDecimal.on('keydown', (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            buttonConvert.trigger('click');
        }
    });

    buttonConvert.on('click', () => {
        let horizontal = inputSwitchHorizontal.prop('checked');
        if (horizontal) {
            textareaOpResult.removeClass('c-h-250');
            textareaOpResult.addClass('c-h-75');
        }
        else {
            textareaOpResult.removeClass('c-h-75');
            textareaOpResult.addClass('c-h-250');
        }
        if (inputDecimal.val()) {
            divOpResult.show();
            spanIpDecimal.text(inputDecimal.val());
            textareaOpResult.val(base20ToMayan(decimalToBase20(inputDecimal.val()), horizontal));
        }
        else {
            divOpResult.hide();
        }
    });

    buttonCopy.on('click', () => {
        navigator.clipboard.writeText(textareaOpResult.val()).then(() => {
            buttonCopy.prop('disabled', true);
            buttonCopy.text("Copied!");
            setTimeout(() => {
                buttonCopy.prop('disabled', false);
                buttonCopy.text("Copy");
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

});