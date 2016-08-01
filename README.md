# searchkit-recharts

[![Travis][build-badge]][build]
[![searchkit-recharts][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Recharts components for Searchkit

[build-badge]: https://img.shields.io/travis/GregoryPotdevin/searchkit-recharts/master.svg?style=flat-square
[build]: https://travis-ci.org/GregoryPotdevin/searchkit-recharts

[npm-badge]: https://img.shields.io/npm/v/searchkit-recharts.svg?style=flat-square
[npm]: https://www.npmjs.org/package/searchkit-recharts

[coveralls-badge]: https://img.shields.io/coveralls/GregoryPotdevin/searchkit-recharts/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/GregoryPotdevin/searchkit-recharts

## Installation

`npm install searchkit-recharts --save`

## Features

- PieFilterList : Pie chart to use filter list.

## Usage

```javascript
import { PieFilterList } from "searchkit-daterangefilter"
```

```javascript
  <RefinementListFilter
    listComponent={PieFilterList}
    operator="OR"
    field="type.raw"
    title="Categories"
    id="categories"/>
```

## Example


```javascript
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
```

## License

MIT