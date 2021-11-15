import React from 'react'

/**
 * Renders Not Found Component
 * When no routes match within the switch router this component will be rendered
 * @returns JSX element
 */
function NotFound() {
    return (
        <div id="wrapper">
            <img src="https://i.imgur.com/qIufhof.png" alt='NotFoundImage'/>
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div >
    )
}

export default NotFound
