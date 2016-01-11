const Recipe = React.createClass({
    getStyle: function() {
        return {
            wrapper: {
                backgroundColor: '#1c1cb0',          
                display: 'inline-block',
                width: '90%',
                borderRadius: '3px',
                margin: '2% 0 2% 0',
                padding: '1rem',
            },
            recipe: {
                display: 'inline-block',
                backgroundColor: 'white',
                border: 'solid black 1px',
                padding: '5%',
                width: '90%',
            },
            name: {
                fontSize: '2.0rem',
                margin: 0,
                fontWeight: '500',
            },
        };
    },

    updateChecked: function(e) {
        this.props.onCheckChange(this.props.name, e.target.checked);
    },

    renderIngredients: function() {
        return this.props.ingredients.map((ingredient) => {
            return (
                <li>{ ingredient }</li> 
            ); 
        });
    },

    render: function() {
        const props = this.props;
        return(
            <div style={ this.getStyle().wrapper }>
                <div style={ this.getStyle().recipe }>
                    <input
                        type="checkbox" 
                        checked={ this.props.isSelected }
                        onChange={ this.updateChecked } 
                    />
                    <p style={ this.getStyle().name }>{ props.name }</p>
                    <p>{ props.type }</p>
                    <p>
                        <span>&#x231b;</span> { props.cook_time } minutes
                    </p>
                    <p>Ingredients:</p>
                    <ul>{ this.renderIngredients() }</ul>
                </div>
            </div>
        );
    }
});
