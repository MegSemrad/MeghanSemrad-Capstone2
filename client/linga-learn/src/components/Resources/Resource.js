import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';


const Resource = ({ resource, handleEditResource, handleDeleteResource }) => {
    // const history = useHistory();

    return (
        <>
            <thead>
                <tr>
                    <th>{resource.resourceType.type}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr key={resource.id}>

                    <td>{resource.source}</td>
                    <td>
                        <Button outline onClick={() => handleEditResource(resource)}>◀</Button>
                        <Button outline onClick={() => handleDeleteResource(resource)}>◀</Button>
                    </td>
                </tr>
            </tbody>
        </>

    )
}



export default Resource;