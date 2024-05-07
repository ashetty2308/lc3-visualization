import React from 'react';

const MyComponent: React.FC<{ name: string}> = ({ name }) => {
    return (
        <div>
            <h1>Hello, {name}</h1>
            <p>Welcome to React.js in VS Code Extension!</p>
        </div>
    );
};

export default MyComponent;