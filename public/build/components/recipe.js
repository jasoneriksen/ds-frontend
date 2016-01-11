'use strict';

var Recipe = React.createClass({
    displayName: 'Recipe',

    getBackgroundColor: function getBackgroundColor() {
        switch (this.props.type.toLowerCase()) {
            case 'russian':
                return 'darkred';
                break;
            case 'italian':
                return 'darkgreen';
                break;
            case 'chinese':
                return 'orange';
                break;
            case 'salvadoran':
                return 'darkblue';
                break;
            default:
                return '#acccef';
        }
    },

    getStyle: function getStyle() {
        var background = this.getBackgroundColor();
        return {
            wrapper: {
                backgroundColor: background,
                display: 'inline-block',
                width: '90%',
                borderRadius: '3px',
                margin: '2% 0 2% 0',
                padding: '1rem'
            },
            recipe: {
                display: 'inline-block',
                backgroundColor: 'white',
                border: 'solid black 1px',
                padding: '5%',
                width: '90%'
            },
            name: {
                fontSize: '2.0rem',
                margin: 0,
                fontWeight: '500'
            }
        };
    },

    updateChecked: function updateChecked(e) {
        this.props.onCheckChange(this.props.name, e.target.checked);
    },

    renderIngredients: function renderIngredients() {
        return this.props.ingredients.map(function (ingredient) {
            return React.createElement(
                'li',
                null,
                ingredient
            );
        });
    },

    render: function render() {
        var props = this.props;
        return React.createElement(
            'div',
            { style: this.getStyle().wrapper },
            React.createElement(
                'div',
                { style: this.getStyle().recipe },
                React.createElement('input', {
                    type: 'checkbox',
                    checked: this.props.isSelected,
                    onChange: this.updateChecked
                }),
                React.createElement(
                    'p',
                    { style: this.getStyle().name },
                    props.name
                ),
                React.createElement(
                    'p',
                    null,
                    props.type
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'span',
                        null,
                        '⌛'
                    ),
                    ' ',
                    props.cook_time,
                    ' minutes'
                ),
                React.createElement(
                    'p',
                    null,
                    'Ingredients:'
                ),
                React.createElement(
                    'ul',
                    null,
                    this.renderIngredients()
                )
            )
        );
    }
});