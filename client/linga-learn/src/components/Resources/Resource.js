import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';


const Resource = ({ resource, handleDeleteResource }) => {

    const history = useHistory();

    return (
        <>
            <tbody>
                <tr key={resource.id}>

                    <td>{resource.source}</td>
                    <td>
                        <Button outline onClick={() => history.push(`/EditResource/${resource.id}`)}>✏</Button>
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