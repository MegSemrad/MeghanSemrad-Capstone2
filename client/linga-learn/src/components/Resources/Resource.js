import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';


const Resource = ({ resource, handleEditResource, handleDeleteResource }) => {

    return (
        <>
            <tbody>
                <tr key={resource.id}>

                    <td>{resource.source}</td>
                    <td>
                        <Button outline onClick={() => handleEditResource(resource)}>✏</Button>
                        <Button outline onClick={event => {
                            event.preventDefault()
                            handleDeleteResource(resource)
                        }}>✖</Button>
                    </td>
                </tr>
            </tbody>
        </>

    )
}



export default Resource;