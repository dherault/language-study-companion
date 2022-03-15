import { useEffect, useMemo, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import { Button, Card, Checkbox, FormControlLabel, Switch } from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'

import data from '../../data'

function Home() {
  const allNames = data.map(item => getChildrenNames(item)).flat()

  const [isTtsenabled, setIsTtsEnabled] = useState(true)
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
      <FormControlLabel
        control={(
          <Switch
            checked={isTtsenabled}
            onChange={event => setIsTtsEnabled(event.target.checked)}
          />
        )}
        label="Text to speech"
      />
      <div className="y8 mt-2">
        <CardDisplay
          data={selectEntries(data)}
          isTtsenabled={isTtsenabled}
        />
      </div>
    </>
  )
}

function CardDisplay({ data, isTtsenabled, mode = 'both' }) {
  const [revealed, setRevealed] = useState(false)
  const [[from, to, fromLanguage, toLanguage], setCard] = useState(pick())

  function pick() {
    if (data.length === 0) {
      return ['Please select a lesson', 'Please select a lesson']
    }

    const set = data[Math.floor(Math.random() * data.length)]
    const entries = Object.entries(set.entries)

    return [...entries[Math.floor(Math.random() * entries.length)], set.from, set.to]
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

  useEffect(() => {
    if (!isTtsenabled) return

    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1
    msg.rate = 0.75
    msg.text = revealed ? answer : question
    msg.lang = revealed ? question === from ? toLanguage : fromLanguage : question === from ? fromLanguage : toLanguage
    speechSynthesis.speak(msg)
  }, [isTtsenabled, answer, question, from, toLanguage, fromLanguage, revealed])

  return (
    <Card
      onClick={handleReveal}
      style={{ width: 'calc(min(calc(100vw - 32px), 384px))', height: 'calc(min(calc(100vw - 32px), 384px))', fontSize: '2rem' }}
      className="y5 cursor-pointer no-select text-align-center"
    >
      {capitalize(question)}
      {revealed && (
        <SwapVertIcon className="my-4" />
      )}
      {revealed ? capitalize(answer) : ''}
    </Card>
  )
}

export default Home
