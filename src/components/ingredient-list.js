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
            border: 'solid black 1px',
            margin: '0 0.25rem 0.25rem 0',
            padding: '0.25rem',
            
        };        
    },

    getIngredients: function() {
        const selectedRecipes = RECIPES.filter((recipe) => {
            return this.props.selectedRecipes.indexOf(recipe.name) !== -1;
        });
        if(!selectedRecipes.length) return;
        if(selectedRecipes.length === 1) return selectedRecipes[0].ingredients.sort();
        return selectedRecipes.reduce(appendIngredients).sort().filter(uniqueValues);
    },

    renderIngredients: function() {
        const ingredients = this.getIngredients();
        if(!ingredients) return;
        return ingredients.map((ingredient) => {
            return (
                <li style={ this.getStyle() }>{ingredient}</li>
            );
        });
    },

    render: function() {
        return (
            <div>
                <p>Ingredients:</p>
                <ul>
                    {this.renderIngredients()}
                </ul>
            </div>
        );
    }
});

