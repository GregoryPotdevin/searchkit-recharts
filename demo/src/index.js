import React from 'react'
import {render} from 'react-dom'

import {
  SearchkitProvider, SearchkitManager,  
  Layout, LayoutResults, LayoutBody, TopBar, SideBar,
  SearchBox, HierarchicalMenuFilter, RefinementListFilter,
  Hits, NoHits,
} from "searchkit"

require('searchkit/theming/theme.scss')
require('./demo.css')

import { PieFilterList } from "../../src"

const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(host)


const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source = result._source
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">
        <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
        <div data-qa="title" className={bemBlocks.item("title")}>{source.title}</div>
      </a>
    </div>
  )
}

const Demo = React.createClass({
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
          </TopBar>
          <LayoutBody>
            <SideBar>
              <RefinementListFilter
                listComponent={PieFilterList}
                operator="OR"
                field="type.raw"
                title="Categories"
                id="categories"/>
            </SideBar>
            <LayoutResults>
              <Hits mod="sk-hits-grid" hitsPerPage={10} itemComponent={MovieHitsGridItem}
                sourceFilter={["title", "poster", "imdbId"]}/>
              <NoHits/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    )
  }
})

render(<Demo/>, document.querySelector('#demo'))
