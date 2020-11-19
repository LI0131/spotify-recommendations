import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Table, TableHeader, TableBody, TableVariant,
    compoundExpand, sortable, SortByDirection
} from '@patternfly/react-table';
import {  EmptyStateBody, EmptyState, EmptyStateIcon, EmptyStateVariant, Bullseye } from '@patternfly/react-core';
import { AngleDownIcon, SearchIcon } from '@patternfly/react-icons';

const cells = [
    {
        title: 'Song',
        transforms: [sortable]
    }, {
        title: 'Artists',
        cellTransforms: [compoundExpand]
    }, {
        title: 'Preview'
    }, {
        title: 'Popularity',
        transforms: [sortable]
    }, {
        title: 'Open in Spotify'
    }
]

const Results = () => {
    const recommendations = useSelector(state => state.Reducer.recommendations);
    const [rows, setRows] = useState();
    const [sortDir, setSortDir] = useState('desc');
    const [sortBy, setSortBy] = useState('Popularity');

    const generateRows = (data) => {
        return data.tracks.flatMap((item, index) => {
            return [
                {
                    cells: [
                        {
                            title: item.name
                        }, {
                            title: <AngleDownIcon/>,
                            props: { isOpen: false, ariaControls: 'compound-expansion-table-1' }
                        }, {
                            title: item.preview_url ? <a href={item.preview_url} target="_blank"> Preview Song </a> : null
                        }, {
                            title: item.popularity
                        }, {
                            title: <a href={item?.external_urls?.spotify} target="_blank"> Listen Now </a>
                        }
                    ]
                },
                {
                    parent: index * 2,
                    compoundParent: 1,
                    cells: [
                        {
                            title: <Table
                                cells={[
                                    {
                                        title: 'Artist',
                                        props: { colSpan: 2, className: 'pf-m-no-padding' }
                                    }, {
                                        title: 'Link',
                                        props: { colSpan: 2, className: 'pf-m-no-padding' }
                                    }
                                ]}
                                rows={item.artists.map(obj => [{
                                    title: obj?.name
                                }, {
                                    title: <a href={obj?.external_urls?.spotify} target="_blank">Open in Spotify</a>
                                }])}
                            >
                                <TableHeader/>
                                <TableBody/>
                            </Table>
                        }
                    ]
                }
            ]
        });
    };

    const onExpand = (e, rowIndex, colIndex) => {
        if (rows[rowIndex].cells[colIndex].title !== '') {
            rows[rowIndex].cells[colIndex].props.isOpen ?
                rows[rowIndex].cells[colIndex].props.isOpen = false :
                rows[rowIndex].cells[colIndex].props.isOpen = true;
            setRows([...rows]);
        }
    };

    const onSort = (_event, index, direction) => {
        const before = rows.reduce((arr, item, pos) => {
            return (pos - 1) % 2 ? [...arr, item] : arr;
        }, []);
        let after = before.sort((a, b) => (a.cells[index].title < b.cells[index].title ? -1 :
            a.cells[index].title > b.cells[index].title ? 1 : 0));
        after = direction === SortByDirection.asc ? after : after.reverse();
        setRows(after.flatMap(col => {
            return rows.reduce((arr, item, pos) => {
                if (JSON.stringify(col) === JSON.stringify(item)) {
                    console.error(rows.length - pos - 1);
                    return [...arr, col, {
                        ...rows[pos + 1],
                        parent: rows.length - pos - 2
                    }]
                } else {
                    return arr
                }
            }, [])
        }));
        setSortDir(direction);
        setSortBy(index);
    };

    useEffect(() => {
        recommendations && setRows(generateRows(recommendations));
    }, [recommendations]);

    return <React.Fragment>
        {rows && <Table
            onExpand={onExpand}
            cells={cells}
            rows={rows}
            variant={TableVariant.compact}
            sortBy={{
                index: sortBy,
                direction: sortDir
            }}
            onSort={onSort}
        >
            <TableHeader/>
            <TableBody/>
        </Table>}
        {!rows && <Table
            cells={cells}
            rows={[{
                heightAuto: true,
                cells: [
                  {
                    props: { colSpan: 8 },
                    title: (
                      <Bullseye>
                        <EmptyState variant={EmptyStateVariant.small}>
                          <EmptyStateIcon icon={SearchIcon} />
                          <EmptyStateBody>
                            No results found to display.
                          </EmptyStateBody>
                        </EmptyState>
                      </Bullseye>
                    )
                  },
                ]
              }]}
        >
            <TableHeader/>
            <TableBody/>
        </Table>}
    </React.Fragment>;
};

export default Results;
