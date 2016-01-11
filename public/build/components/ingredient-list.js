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
            cursor: 'pointer',
            border: 'solid black 1px',
            background: '#eee',
            borderRadius: '2px',
            margin: '0 0.25rem 0.25rem 0',
            padding: '0.25rem'
        };
    },

    getIngredients: function getIngredients() {
        var _this = this;

        var selectedRecipes = RECIPES.filter(function (recipe) {
            return _this.props.selectedRecipes.indexOf(recipe.name) !== -1;
        });

        if (!selectedRecipes.length) return [];
        if (selectedRecipes.length === 1) return selectedRecipes[0].ingredients.sort();

        return selectedRecipes.reduce(appendIngredients).sort().filter(uniqueValues);
    },

    updateFilter: function updateFilter(e) {
        this.props.updateFilter(e.target.innerHTML);
    },

    renderHeader: function renderHeader(ingredients) {
        return ingredients.length ? React.createElement(
            'p',
            null,
            'Required Ingredients:'
        ) : null;
    },

    renderIngredients: function renderIngredients(ingredients) {
        var _this2 = this;

        if (!ingredients) return;

        return ingredients.map(function (ingredient) {
            return React.createElement(
                'li',
                {
                    ref: ingredient,
                    style: _this2.getStyle(),
                    onClick: _this2.updateFilter },
                ingredient
            );
        });
    },

    render: function render() {
        var ingredients = this.getIngredients();

        return React.createElement(
            'div',
            null,
            this.renderHeader(ingredients),
            React.createElement(
                'ul',
                null,
                this.renderIngredients(ingredients)
            )
        );
    }
});