function uniqueValues(value, index, self) { 
    return self.indexOf(value) === index;
}

function appendIngredients(previous, current) {
    if(!Array.isArray(previous)) previous = previous.ingredients; 
    return previous.concat(current.ingredients); 
}

const IngredientList = React.createClass({

    getStyle: function() {
        return {
            display: 'inline-block',
            cursor: 'pointer',
            border: 'solid black 1px',
            background: '#eee',
            borderRadius: '2px',
            margin: '0 0.25rem 0.25rem 0',
            padding: '0.25rem',
        };        
    },

    getIngredients: function() {
        const selectedRecipes = RECIPES.filter((recipe) => {
            return this.props.selectedRecipes.indexOf(recipe.name) !== -1;
        });

        if(!selectedRecipes.length) return [];
        if(selectedRecipes.length === 1) return selectedRecipes[0].ingredients.sort();

        return selectedRecipes.reduce(appendIngredients).sort().filter(uniqueValues);
    },

    updateFilter: function(e) {
        this.props.updateFilter(e.target.innerHTML);
    },

    renderHeader: function(ingredients) {
        return ingredients.length
            ? (<p>Required Ingredients:</p>)
            : null;
    },

    renderIngredients: function(ingredients) {
        if(!ingredients) return;

        return ingredients.map((ingredient) => {
            return (
                <li
                    ref={ ingredient }
                    style={ this.getStyle() }
                    onClick={ this.updateFilter } >
                    { ingredient }
                </li>
            );
        });
    },

    render: function() {
        const ingredients = this.getIngredients();

        return (
            <div>
                { this.renderHeader(ingredients) }
                <ul>
                    { this.renderIngredients(ingredients) }
                </ul>
            </div>
        );
    }
});

