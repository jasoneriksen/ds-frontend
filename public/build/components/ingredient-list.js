'use strict';

function uniqueValues(value, index, self) {
    return self.indexOf(value) === index;
}

function appendIngredients(previous, current) {
    if (!Array.isArray(previous)) previous = previous.ingredients;
    return previous.concat(current.ingredients);
}

var IngredientList = React.createClass({
    displayName: 'IngredientList',

    getStyle: function getStyle() {
        return {
            display: 'inline-block',
            border: 'solid black 1px',
            margin: '0 0.25rem 0.25rem 0',
            padding: '0.25rem'

        };
    },

    getIngredients: function getIngredients() {
        var _this = this;

        var selectedRecipes = RECIPES.filter(function (recipe) {
            return _this.props.selectedRecipes.indexOf(recipe.name) !== -1;
        });
        if (!selectedRecipes.length) return;
        if (selectedRecipes.length === 1) return selectedRecipes[0].ingredients.sort();
        return selectedRecipes.reduce(appendIngredients).sort().filter(uniqueValues);
    },

    renderIngredients: function renderIngredients() {
        var _this2 = this;

        var ingredients = this.getIngredients();
        if (!ingredients) return;
        return ingredients.map(function (ingredient) {
            return React.createElement(
                'li',
                { style: _this2.getStyle() },
                ingredient
            );
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
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
        );
    }
});