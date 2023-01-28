import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import Encryptor from '../encryptor'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

function encrypt(input: string, key: string) {
  return new Encryptor(key).encrypt(input)
}

function decrypt(input: string, key: string) {
  return new Encryptor(key).decrypt(input)
}

export default function Home() {
  const [mode, setMode] = useState<'e' | 'd'>('e')
  const [key, setKey] = useState('')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('result goes here!')

  return (
    <>
      <Head>
        <title>encryption stuff whoa</title>
        <meta name="description" content="just a small lil thing i made" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <h1>encryption stuff whoa!!!!!!</h1>
        <p>this is just some silly lil thing i made in c# then ported to js bc it turns out distributing ur tools as executables aint a smart idea</p>
        <p>current mode: {mode == 'e' ? 'encrypt' : 'decrypt'}</p>
        <button onClick={() => setMode('e')} className="e">encrypting</button>
        <button onClick={() => setMode('d')} className="d">decrypting</button>
        <br/>
        <span>
          <span>key: </span>
          <input type="password" value={key} onChange={(e) => {
            setKey(e.target.value)
          }} />
        </span>
        <span>
          <span>text: </span>
          <input value={inputText} onChange={(e) => {
            setInputText(e.target.value)
            }} />
        </span>
        <p className="output">{result}</p>
        <button onClick={() => setResult(
              mode == 'e' ?
                encrypt(inputText, key)
                : decrypt(inputText, key)
            )}>do the thing</button>
      </main>
    </>
  )
}
