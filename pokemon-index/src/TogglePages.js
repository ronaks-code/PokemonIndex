import React from 'react'

export default function TogglePages({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
        {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
