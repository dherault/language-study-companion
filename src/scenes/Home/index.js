import { useMemo, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import { Button, Card, Checkbox } from '@mui/material'

import data from '../../data'

function Home() {
  const allNames = data.map(item => getChildrenNames(item)).flat()

  const [open, setOpen] = useState(false)
  const [selectedNames, setSelectedNames] = useState(allNames)

  function getChildrenNames(item) {
    return [item.name, ...(item._ || []).map(child => getChildrenNames(child)).flat(Infinity)]
  }

  function handleSelect(item) {
    const names = getChildrenNames(item)

    if (selectedNames.includes(item.name)) {
      setSelectedNames(selectedNames.filter(selectedName => !names.includes(selectedName)))
    }
    else {
      setSelectedNames([...new Set([...selectedNames, ...names])])
    }
  }

  function createTreeItems(items) {
    return items.map(item => (
      <TreeItem
        key={item.name}
        nodeId={item.name}
        label={(
          <div className="x4">
            <Checkbox
              checked={selectedNames.includes(item.name)}
              onChange={() => handleSelect(item)}
            />
            {item.name}
          </div>
        )}
      >
        {!!item._ && createTreeItems(item._)}
      </TreeItem>
    ))
  }

  function selectEntries(items) {
    return items.filter(item => selectedNames.includes(item.name)).map(item => selectEntries(item._ || []).concat(item)).flat(Infinity).filter(item => !!item.entries)
  }

  return (
    <>
      <Button onClick={() => setOpen(x => !x)}>
        {open ? 'Close' : 'Choose lesson'}
      </Button>
      <div style={{ height: open ? 'auto' : 0, overflow: 'hidden' }}>
        <TreeView expanded={allNames}>
          {createTreeItems(data)}
        </TreeView>
      </div>
      <div className="y8">
        <CardDisplay data={selectEntries(data)} />
      </div>
    </>
  )
}

function CardDisplay({ data, mode = 'both' }) {
  const [revealed, setRevealed] = useState(false)
  const [[from, to], setCard] = useState(pick())

  function pick() {
    if (data.length === 0) {
      return ['Please select a lesson', 'Please select a lesson']
    }
    const entries = Object.entries(data[Math.floor(Math.random() * data.length)].entries)

    return entries[Math.floor(Math.random() * entries.length)]
  }

  function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1)
  }

  function handleReveal() {
    if (revealed) {
      setRevealed(false)
      setCard(pick())
    }
    else {
      setRevealed(true)
    }
  }

  const question = useMemo(() => mode === 'both' ? Math.random() > 0.5 ? from : to : mode === 'from' ? from : to, [from, to, mode])
  const answer = question === from ? to : from

  return (
    <Card
      onClick={handleReveal}
      style={{ width: 256 + 128, height: 256 + 128, fontSize: '2rem' }}
      className="x5 cursor-pointer no-select"
    >
      {capitalize(revealed ? answer : question)}
    </Card>
  )
}

export default Home
