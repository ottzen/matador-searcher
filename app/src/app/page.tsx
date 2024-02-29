"use client"
import Image from 'next/image'
import styles from './page.module.css'
import SubtitleSearch from './components/SubtitleSearch/SubtitleSearch.component'

export default function Home() {
  const srtContent = `
  00:02:56,500 --> 00:02:59,333
  Kvik, kom her.
  
  00:03:09,300 --> 00:03:13,009
  - Dav, Boldt. Dav med jer.
  - Dav, Larsen.

  00:03:13,220 --> 00:03:17,577
  Boldt, hvad står den på i dag?
  
  00:03:17,780 --> 00:03:23,537
  Det ser sgu godt ud.
  Så må jeg hellere få en dram til.
  
  00:03:23,740 --> 00:03:27,130
  Der er '12.30' til Næstved.
  
  00:03:35,500 --> 00:03:38,776
  Nå, Fede, skal du hjem og se,
  hvad mor har til middag?
  
  00:03:39,060 --> 00:03:41,335
  Der er din gode ven, Røde.
  
  00:03:41,540 --> 00:03:45,294
  Bankdirektør Varnæs med konen.
  De skal med toget.
  
  00:03:45,500 --> 00:03:51,370
  De skal hente. Fruens søster
  og børnene har været på ferie.
  
  00:03:51,580 --> 00:03:55,858
  Boldt har kontakt
  med de højere kredse.
  
  00:03:56,060 --> 00:03:59,370
  Den kontakt kunne De vist
  godt tænke Dem, Lauritz Jensen.
  
  00:03:59,580 --> 00:04:04,449
  Røde interesserer sig sgu ikke
  for kvinder, kun for politik.
  
  00:04:27,780 --> 00:04:32,092
  - Her er vi.
  - Hvem er det? Regitze!
  
  00:04:32,300 --> 00:04:39,172
  - Er hun ikke for tyndt klædt på?
  - Kom så, Ulrik! Han var her lige.
  
  00:04:39,380 --> 00:04:44,010
  - Hvis han nu er faldet af toget?
  - Vi skal bare finde ham.
  
  00:04:44,220 --> 00:04:47,292
  Jamen så led da!
  
  00:05:00,540 --> 00:05:05,091
  - Han er der ikke.
  - Er det ham her?
  
  00:05:05,300 --> 00:05:09,771
  - Nej, det ved gud det ikke er.
  - Hvad bestiller De med min dreng?
  
  00:05:09,980 --> 00:05:12,448
  Undskyld, jeg troede ...
  
  00:05:12,660 --> 00:05:20,055
  - Jamen der har vi jo Ulrik.
  - Jeg har låst mig inde!
`;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <h1>Subtitle Search App</h1>
      <SubtitleSearch srtContent={srtContent} />

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
