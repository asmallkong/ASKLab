'use strict';

(function () {
    //This is the caluclator module
    //Module Dependencieds
    // 'use strict'
    var
        //Module Varables
        result,
        input = '',
        jQMap = {},
        operand = '',
        //for validating operands
        operatorList = ['+', '-', 'x', '÷', '%'];

    function augmentJQMap() {
        jQMap.$inputDisplay = $('.input-display');
        jQMap.$inputBtn = $('.key-board button');
        jQMap.$deleteBtn = $('.delete-btn');
    }

    function isOperator(string) {
        return operatorList.indexOf(string) >= 0; //returns true or false
    }

    function lastInputIsOperator(argument) {
        return isOperator(input.charAt(input.length - 1));
    }

    function validateInput(_input) {
        if (!input && result && isOperator(_input)) {
            input = result;
        }

        if (_input === '.' && operand.indexOf('.') >= 0 || //avoid .1.3
            _input === input.charAt(input.length - 1) && isOperator(_input) || // avoid ++ or xx
            _input !== '-' && !input && isOperator(_input) // avoid 'x123'; alow '-123'
        ) {

            return false;
        }

        return true;
    }

    function expressInMath(_input) {

        if (!validateInput(_input)) {
            console.log('Not Valid');return false;
        };

        if (isOperator(_input)) {
            if (lastInputIsOperator()) {
                //lastInput isOperator
                if (input.length === 1) {
                    //that means lastInput is '-'
                    input = '';
                } else {
                    input = input.slice(0, input.length - 1) + _input; //replace last entry with _input
                };
            } else {
                input += _input;
            }

            operand = '';
        } else {
            input += _input;
            operand += _input;
        }

        result = '';
        jQMap.$deleteBtn.text('CE');
        jQMap.$inputDisplay.text(input);
    }

    function executeExpression() {
        if (!input) {
            return;
        }

        if (isOperator(input.charAt(input.length - 1))) {
            result = 'Error';
        } else {
            var expression = input.replace(/x/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
            result = eval(expression) + '';
        }

        jQMap.$inputDisplay.text(result);
        jQMap.$deleteBtn.text('AC');

        input = '';
        operand = '';
    }

    function deleteLastInput() {
        if (jQMap.$deleteBtn.text() === 'AC') {
            result = '';
            jQMap.$inputDisplay.text('');
            jQMap.$deleteBtn.text('CE');
            return;
        };

        if (!input) {
            return;
        }

        input = input.slice(0, input.length - 1);
        if (!lastInputIsOperator()) {
            operand = input.slice(0, input.length - 1);
        };

        jQMap.$inputDisplay.text(input);
    }

    //anlyze input and take needed action
    function analyzeInput() {
        var $this = $(this),
            _input = $this.text();

        if (_input === '=') {
            executeExpression();
        } else if (_input === 'CE' || _input === 'AC') {
            deleteLastInput();
        } else {
            expressInMath(_input);
        };
    }

    function initApp() {
        augmentJQMap();

        // wire events
        jQMap.$inputBtn.on('click', analyzeInput);
    }

    $(initApp);
})();