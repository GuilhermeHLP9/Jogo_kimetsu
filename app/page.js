'use client'
import styles from "./page.module.css";
import useGameManager from "@/hooks/gameManager";

export default function Home() {
    const {heroi, vilao, log, turnoHeroi, handlerAcaoHeroi, jogoAtivo, vencedor, reiniciarJogo, fugiu} = useGameManager()


    return (
        <section className={styles.page}>
            <div className={styles.campoBatalha}>
                <div className={styles.vilao}>
                    <div className={styles.imagemVilao}>
                        <img
                            src="/images/Muzan.png"
                            alt={vilao.nome}
                            className={styles.estVilao}
                        />
                    </div>
                    <div className={styles.infoVilao}>
                        <div className={styles.nome}>{vilao.nome}</div>
                        <div className={styles.hp}>
                            <p className={styles.hpTexto}>HP</p>
                            <div className={styles.hpContainer}>
                                <div
                                    className={styles.hpVida}
                                    style={{width: `${vilao.vida}%`}}
                                ></div>
                            </div>
                            <p className={styles.hpNum}>{vilao.vida}/200</p>
                        </div>
                    </div>
                </div>

                <div className={styles.heroi}>
                    <div className={styles.heroiInfo}>
                        <p className={styles.nome}>{heroi.nome}</p>
                        <div className={styles.hp}>
                            <p className={styles.hpTexto}>HP</p>
                            <div className={styles.hpContainer}>
                                <div
                                    className={styles.hpVida}
                                    style={{width: `${heroi.vida}%`}}
                                ></div>
                            </div>
                            <div className={styles.hpNum}>{heroi.vida}/100</div>
                        </div>
                    </div>
                    <div className={styles.imagemHeroi}>
                        <img
                            src="/images/tanjiro.png"
                            alt={heroi.nome}
                            className={styles.estHeroi}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.interfaceBatalha}>
                <div className={styles.logContainer}>
                    <div className={styles.log}>
                        {log.length === 0 ? (
                            <p>A batalha começou!</p>
                        ) : (
                            log.slice(-3).map((mensagem, index) => (
                                <p key={index}>{mensagem}</p>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.containerAcoes}>
                    <div className={styles.acoes}>
                        <button
                            className={`${styles.acoesBtn} ${styles.atacarBtn}`}
                            onClick={() => handlerAcaoHeroi('atacar')}
                            disabled={!turnoHeroi || !jogoAtivo}
                        >
                            ⚔️ Atacar
                        </button>
                        <button
                            className={`${styles.acoesBtn} ${styles.defenderBtn}`}
                            onClick={() => handlerAcaoHeroi('especial')}
                            disabled={!turnoHeroi || !jogoAtivo}
                        >
                            🔥 Especial
                        </button>
                        <button
                            className={`${styles.acoesBtn} ${styles.pocaoBtn}`}
                            onClick={() => handlerAcaoHeroi('respiracao')}
                            disabled={!turnoHeroi || !jogoAtivo}
                        >
                            💨 Respiração
                        </button>
                        <button
                            className={`${styles.acoesBtn} ${styles.fugirBtn}`}
                            onClick={() => handlerAcaoHeroi('correr')}
                            disabled={!turnoHeroi || !jogoAtivo}
                        >
                            🏃‍♂️ Fugir
                        </button>

                        {!fugiu &&(
                            <div className={styles.fimJogo}>
                                <div className={styles.fimJogoConteudo}>
                                    <h2 className={styles.fimJogoTitulo}>🏃‍♂️FUGIU!</h2>
                                    <p className={styles.fimJogoTexto}>{`${heroi.nome} Fugiu da luta!`}</p>
                                    <button
                                        className={styles.reiniciarBtn}
                                        onClick={reiniciarJogo}
                                    >
                                        🔄 Jogar Novamente
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <div className={styles.turno}>
                {!jogoAtivo ?
                    `🎮 Jogo Finalizado - ${vencedor} Venceu!` :
                    (turnoHeroi ? "Seu turno!" : "Turno do inimigo...")
                }
            </div>

            {!jogoAtivo && (
                <div className={styles.fimJogo}>
                    <div className={styles.fimJogoConteudo}>
                        <h2 className={styles.fimJogoTitulo}>
                            {vencedor === heroi.nome ? "🏆 VITÓRIA!" : "💀 DERROTA!"}
                        </h2>
                        <p className={styles.fimJogoTexto}>
                            {vencedor === heroi.nome ?
                                `Parabéns! ${heroi.nome} derrotou ${vilao.nome}!` :
                                `${vilao.nome} derrotou ${heroi.nome}...`
                            }
                        </p>
                        <button
                            className={styles.reiniciarBtn}
                            onClick={reiniciarJogo}
                        >
                            🔄 Jogar Novamente
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}