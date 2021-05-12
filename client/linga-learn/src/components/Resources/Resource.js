import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';


const Resource = ({ resource, handleDeleteResource }) => {

    const history = useHistory();

    return (
        <>
            <tbody>
                <tr key={resource.id}>

                    <td className="resourceSourceElement">{resource.source}</td>
                    <td className="resourceButtonsElement">
                        <Button
                            outline
                            close
                            onClick={event => {
                                event.preventDefault()
                                handleDeleteResource(resource)
                            }}><span aria-hidden className="resourceDeleteButtonSpan">✖</span></Button>
                        <Button
                            outline
                            close
                            onClick={() =>
                                history.push(`/EditResource/${resource.id}`)
                            }><span aria-hidden className="resourceEditButtonSpan">✏</span></Button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}


export default Resource;