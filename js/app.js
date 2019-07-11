$(document).ready(function() {
    console.log('Welcome to the calculator app');

    var data = '';
    $('.bttn').on('click', function(event) {
        var value = event.target.value;
        if (data === '' && $.inArray(value, ['/', '+', 'x', '-', '=']) >= 0) {
            var existingValue = $('#output').val();

            data = existingValue ? existingValue : '0';
        }
        switch (value) {
            case 'C':
                data = '';
            case '=':
                var i, t = data.split(/([\/\+x-])/);

                $.each([
                    ['x', (a, b) => a * b],
                    ['/', (a, b) => a / b],
                    ['+', (a, b) => a + b],
                    ['-', (a, b) => a - b]
                ], (_, [k, fn]) => {
                    while ((i = t.indexOf(k)) > -1) {
                        t.splice(i-1, 3, fn(parseInt(t[i-1]), parseInt(t[i+1])));
                    }
                });

                $('#output').val(t[0]);

                data = '';
                break;
            default:
                data += value;

                $('#output').val(data);
        }
    });
});