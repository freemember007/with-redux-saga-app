import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { ConnectedRequestContainer } from 'redux-saga-requests-react'

const getBooks = state => state.books

const Book = () => {

  const books = useSelector(getBooks) || []
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_BOOKS' ,request: { url: '/todo'} })
  // }, [])

  return (
    <div>
      <ConnectedRequestContainer
        requestSelector={state => state.books}
        errorComponent={() => <p>Error...</p>}
        loadingComponent={() => <p>loading...</p>}
        noDataMessage={<p>There is no entity currently.</p>}
      >
        {({ data }) => <p>{data.toString()}</p>}
      </ConnectedRequestContainer>
      <button onClick={() => dispatch({ type: 'FETCH_BOOKS' ,request: { url: '/todo'} })}>
        aaa
      </button>
    </div>
  )
}

// export default connect(state => state)(Book)
export default Book

