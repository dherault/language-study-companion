import { useEffect, useMemo, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import { Button, Card, Checkbox, FormControlLabel, Switch } from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'

import data from '../../data'

function isDesktop() {
  let check = false
    ;((a => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) {
      check = true
    }
  })(navigator.userAgent || navigator.vendor || window.opera))

  return !check
}

function Home() {
  const allNames = data.map(item => getChildrenNames(item)).flat()

  const [isTtsenabled, setIsTtsEnabled] = useState(isDesktop())
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
    msg.voice = speechSynthesis.getVoices().find(voice => voice.lang === msg.lang)
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
