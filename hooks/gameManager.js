'use client'
import {useState} from "react";
import { useEffect } from "react";
import styles from "@/app/page.module.css";

export default function useGameManager() {
    const heroiInicial = {vida: 100, nome: "Tanjiro"}
    const vilaoInicial = {vida: 200, nome: "Muzan"}

    const [heroi, setHeroi] = useState(heroiInicial)
    const [vilao, setVilao] = useState(vilaoInicial)
    const [log,setLog] = useState([])
    const [turnoHeroi, setTurnoHeroi] = useState(true)
    const [jogoAtivo, setJogoAtivo] = useState(true)
    const [vencedor, setVencedor] = useState(null)
    const [fugiu, setFugiu] = useState(false)
    const [turnoVilao, setTurnoVilao] = useState(false)


    useEffect(() => {
        if (heroi.vida <= 0 && jogoAtivo) {
            setVencedor(vilao.nome)
            setJogoAtivo(false)
            adicionarLog(`💀 ${heroi.nome} foi derrotado! ${vilao.nome} venceu a batalha!`)
        } else if (vilao.vida <= 0 && jogoAtivo) {
            setVencedor(heroi.nome)
            setJogoAtivo(false)
            adicionarLog(`🏆 ${heroi.nome} derrotou ${vilao.nome}! Você venceu!`)
        }
    }, [heroi.vida, vilao.vida, jogoAtivo, turnoVilao])

    useEffect(() => {
        if (!turnoVilao) return
        if (!jogoAtivo || fugiu || vilao.vida <= 0 || heroi.vida <= 0) {
            setTurnoVilao(false)
            return
        }

        const timeout = setTimeout(() => {
            let opcoes = Object.keys(acoesVilao)
            if (vilao.vida > 50) {
                opcoes = opcoes.filter(opcao => opcao !== "cura")
            }

            const escolha = opcoes[Math.floor(Math.random() * opcoes.length)]
            acoesVilao[escolha]?.()

            setTurnoVilao(false)
            setTurnoHeroi(true)
        }, 100)

        return () => clearTimeout(timeout)
    }, [turnoVilao])

    const modificarVida = (alvo, dano) => {
        const setter = alvo === "heroi" ? setHeroi : setVilao
        setter(prev => ({ ...prev, vida: prev.vida + dano }))
    }

    const adicionarLog = (mensagem) => {
        setLog(prev => [...prev, mensagem])
    }

    const reiniciarJogo = () => {
        window.location.reload()
        adicionarLog("🔄 Uma nova batalha começou!")
    }

    const acoesHeroi = {
        atacar: () => {
            if(vilao.vida < 15){
                modificarVida("vilao", 0 - vilao.vida)
                adicionarLog(`${heroi.nome} usou a respiração da água em ${vilao.nome} e causou 15 de dano`)
            }else {
                modificarVida("vilao", -15)
                adicionarLog(`${heroi.nome} usou a respiração da água em ${vilao.nome} e causou 15 de dano`)
            }
        },
        especial: () => {
            if(vilao.vida < 40){
                modificarVida("vilao", 0 - vilao.vida)
                if(heroi.vida < 15){
                    modificarVida("heroi", 0 - heroi.vida)
                    adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 40 de dano mas perdeu 15 de vida`)
                }else {
                    modificarVida("heroi", -15)
                    adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 40 de dano mas perdeu 15 de vida`)
                }
            }else {
                modificarVida("vilao", -40)
                modificarVida("heroi", -15)
                adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 40 de dano mas perdeu 15 de vida`)}
        },
        respiracao: () => {
            if(heroi.vida > 85){
                modificarVida("heroi", 100 - heroi.vida)
                adicionarLog(`${heroi.nome} usou a respiração e recuperou 15 de vida`)
            }else {
                modificarVida("heroi", 15)
                adicionarLog(`${heroi.nome} usou a respiração e recuperou 15 de vida`)}
        },
        correr: () => {
            adicionarLog(`${heroi.nome} tentou fugir!`)
            setFugiu(true)
            setTurnoHeroi(true)
            setJogoAtivo(false)
        }
    }

    const acoesVilao = {
        atacar: () => {
            if(heroi.vida < 20){
                modificarVida("heroi", 0 - heroi.vida)
                adicionarLog(`${vilao.nome} atacou ${heroi.nome} e causou 20 de dano`)
            }else{
                modificarVida("heroi", -20)
                adicionarLog(`${vilao.nome} atacou ${heroi.nome} e causou 20 de dano`)
            }
        },
        cura: () => {
            modificarVida("vilao", 10)
            adicionarLog(`${vilao.nome} usou uma poção e recuperou 10 de vida`)
        },
        errou: () => {
            adicionarLog(`${vilao.nome} errou seu ataque`)
        }
    }

    const handlerAcaoHeroi = (acao) => {
        if (!turnoHeroi || !jogoAtivo)return

        acoesHeroi[acao]?.()
        setTurnoHeroi(false)

        setTimeout(() => {
            setTurnoVilao(true)
        }, 1700)
    }

    return{
        heroi,
        vilao,
        log,
        turnoHeroi,
        handlerAcaoHeroi,
        jogoAtivo,
        vencedor,
        reiniciarJogo,
        fugiu
    }

}