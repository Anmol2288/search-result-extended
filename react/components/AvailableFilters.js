import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SearchFilter from './SearchFilter'
import PriceRange from './PriceRange'

const LAZY_RENDER_THRESHOLD = 3

const AvailableFilters = ({ filters = [], ...props }) => {
  const [lastOpenFilter, setLastOpenFilter] = useState()
  console.log("all available props $$$$", props)
  const excludedKeys = ["armadora", "modelo", "ano"];
  const filteredFilters = filters.filter(filter => !excludedKeys.includes(filter.key));
  console.log("filteredFilters are^^^^", filteredFilters);
  console.log("filters are-----", filters);
  // return filters.map((filter, i) => (
  //   <Filter
  //     filter={filter}
  //     {...props}
  //     lastOpenFilter={lastOpenFilter}
  //     setLastOpenFilter={setLastOpenFilter}
  //     key={filter.title}
  //     lazyRender={i >= LAZY_RENDER_THRESHOLD}
  //   />
  // ))
  if (!filters || filters.length === 0) {
    // Return null or a placeholder if there are no filters
    return null;
  }

  return filteredFilters.map((filter, i) => (
    <Filter
      filter={filter}
      {...props}
      lastOpenFilter={lastOpenFilter}
      setLastOpenFilter={setLastOpenFilter}
      key={filter.title}
      lazyRender={i >= LAZY_RENDER_THRESHOLD}
    />
  ));
}

const Filter = ({
  filter,
  priceRange,
  preventRouteChange,
  initiallyCollapsed,
  navigateToFacet,
  lazyRender,
  truncateFilters = false,
  openFiltersMode = 'many',
  lastOpenFilter,
  setLastOpenFilter,
  truncatedFacetsFetched,
  setTruncatedFacetsFetched,
  closeOnOutsideClick,
  appliedFiltersOverview,
  showClearByFilter,
  priceRangeLayout,
  scrollToTop,
}) => {
  const { type, title, facets, quantity, oneSelectedCollapse = false } = filter

  switch (type) {
    case 'PriceRanges':
      return (
        <PriceRange
          key={title}
          title={title}
          facets={facets}
          priceRange={priceRange}
          preventRouteChange={preventRouteChange}
          priceRangeLayout={priceRangeLayout}
          scrollToTop={scrollToTop}
          showClearByFilter={showClearByFilter}
          onChangePriceRange={newPriceRange =>
            navigateToFacet([], preventRouteChange, false, newPriceRange)
          }
        />
      )

    default:
      return (
        <SearchFilter
          key={title}
          title={title}
          facets={facets}
          quantity={quantity}
          oneSelectedCollapse={oneSelectedCollapse}
          preventRouteChange={preventRouteChange}
          initiallyCollapsed={initiallyCollapsed}
          navigateToFacet={navigateToFacet}
          lazyRender={lazyRender}
          truncateFilters={truncateFilters}
          lastOpenFilter={lastOpenFilter}
          setLastOpenFilter={setLastOpenFilter}
          openFiltersMode={openFiltersMode}
          truncatedFacetsFetched={truncatedFacetsFetched}
          setTruncatedFacetsFetched={setTruncatedFacetsFetched}
          closeOnOutsideClick={closeOnOutsideClick}
          appliedFiltersOverview={appliedFiltersOverview}
          showClearByFilter={showClearByFilter}
        />
      )
  }
}

AvailableFilters.propTypes = {
  /** Filters to be displayed */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string,
      oneSelectedCollapse: PropTypes.bool,
    })
  ),
  /** Price range query parameter */
  priceRange: PropTypes.string,
  /** Prevent route changes */
  preventRouteChange: PropTypes.bool,
  /** If filters start collapsed */
  initiallyCollapsed: PropTypes.bool,
  /** If filters start truncated */
  truncateFilters: PropTypes.bool,
}

export default AvailableFilters
