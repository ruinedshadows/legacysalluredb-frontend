import Button from 'react-bootstrap/Button'
import React from 'react';


const IconButton = ({icon, onClick}) => (
    <Button onClick={onClick}  variant="outline-primary" size="lg">
        {icon}
    </Button>
)

export default IconButton