import React from 'react'
import { connect } from 'react-redux'

import Page from '../components/page'

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx

    if (store.getState().books.length==0) {
      store.dispatch({ type: 'FETCH_BOOKS' ,request: { url: '/todo'} })
    }

    return { isServer }
  }

  componentDidMount () {
    // this.props.dispatch({ type: 'FETCH_BOOKS' ,request: { url: '/todo'} })
  }

  render () {
    return (
      <div>
        <Page />
      </div>
    )
  }
}

export default connect()(Index)
