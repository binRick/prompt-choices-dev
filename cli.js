#!/usr/bin/env node

var Prompt = require('prompt-checkbox'),
    pj = require('prettyjson'),
    _ = require('underscore'),
    l = console.log;

var getPrompt1Choices = function(_cb) {
    var r = {
        dependencies: [{
                name: 'foo1',
                checked: true,
                data: {
                    foo: 1
                },
            },
            {
                name: 'red2',
                data: {
                    red: 2
                },
            },
        ],
        dep1: [{
                name: 'dep1a',
                disabled: true,
                data: {
                    dep1a: 123
                },
            },
            {
                name: 'dep1b',
                data: {
                    dep1b: 123
                },
            },
        ],
        dep2: [{
                name: 'dep2a',
                data: {
                    dep2a: 123
                },
            },
            {
                name: 'dep2b',
                data: {
                    dep2b: 123
                },
            },
        ],
    };
    _cb(r);
};

var getPrompt2Choices = function(_cb) {
    var c = {
        cat1: [{
                checked: true,
                name: 'abc123',
                data: {
                    abc: 123
                },
            },
            {
                disabled: true,
                name: 'def123',
                data: {
                    def: 123
                },
            },
        ],
        cat2: [{
            checked: true,
            name: 'xyz234',
            data: {
                xyz: 234
            },
        }, ],
    };
    _cb(c);
};
var getAnswerData = function(answers, choices) {
    var r = [],
        categories = Object.keys(choices);
    _.each(answers, function(answer) {
        _.each(categories, function(category) {
            _.each(choices[category], function(choice) {
                choice.data.category = category;
                choice.data.name = choice.name;
                if (choice.name == answer)
                    r.push(choice.data);
            });
        });
    });
    return r;
};

getPrompt1Choices(function(choices1) {
    var prompt1 = new Prompt({
        name: 'install',
        message: 'Which playbooks to run?',
        radio: true,
        choices: choices1,
    });

    prompt1.run().then(function(answer1) {
        getPrompt2Choices(function(choices2) {
            var prompt2 = new Prompt({
                name: 'envs',
                message: 'Which Envs?',
                radio: true,
                choices: choices2,
            });

            prompt2.run().then(function(answer2) {
                var answer1Data = getAnswerData(answer1, choices1),
                    answer2Data = getAnswerData(answer2, choices2);
                l('\nanswer1Data=');
                l(pj.render(answer1Data));
                l('\nanswer2Data=');
                l(pj.render(answer2Data));
            });
        });
    });
});
