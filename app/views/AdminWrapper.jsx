import React from 'react'
import { connect } from 'react-redux'
import AdminNav from 'AdminNav'
import { getUserData } from 'actions'

// require('!style!css!admin-lte/bootstrap/css/bootstrap.min.css')
// require('!style!css!admin-lte/dist/css/AdminLTE.min.css')
// require('!style!css!admin-lte/dist/css/skins/skin-blue.min.css')
// require('!style!css!font-awesome/css/font-awesome.min.css')

//  Chunk assets to lazy load
function getStaticAssets() {
  const { Promise } = global
  return new Promise(resolve => {
    require.ensure([], () => {
      require('!style!css!admin-lte/bootstrap/css/bootstrap.min.css')
      require('!style!css!admin-lte/dist/css/AdminLTE.min.css')
      require('!style!css!admin-lte/dist/css/skins/skin-blue.min.css')
      require('!style!css!font-awesome/css/font-awesome.min.css')
      require('!script!admin-lte/bootstrap/js/bootstrap.min.js')
      require('!script!admin-lte/dist/js/app.min.js')

      resolve()
    }, 'admin-static-assets')
  })
}


class AdminWrapper extends React.Component {
  componentWillMount() {
    document.body.className = 'skin-blue sidebar-mini'
    getStaticAssets()
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getUserData())
  }
  componentWillUnmount() {
    document.body.className = ''
  }
  render() {
    return (
      <div id="admin-app-wrapper" className="wrapper">
        <AdminNav />
        <div className="content-wrapper">
          <section className="content">
            {this.props.children}
          </section>
        </div>
      </div>
    )
  }
}

AdminWrapper.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
}

export default connect()(AdminWrapper)