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
    const [fugiu, setFugiu] = useState(true);

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
    }, [heroi.vida, vilao.vida, jogoAtivo])

    const modificarVida = (alvo, dano) => {
        const setter = alvo === "heroi" ? setHeroi : setVilao
        setter(prev => ({ ...prev, vida: prev.vida + dano }))
    }

    const adicionarLog = (mensagem) => {
        setLog(prev => [...prev, mensagem])
    }

    const reiniciarJogo = () => {
        setHeroi(heroiInicial)
        setVilao(vilaoInicial)
        setLog([])
        setTurnoHeroi(true)
        setJogoAtivo(true)
        setVencedor(null)
        setFugiu(true)
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
            if(vilao.vida < 50){
                modificarVida("vilao", 0 - vilao.vida)
                if(heroi.vida < 15){
                    modificarVida("heroi", 0 - heroi.vida)
                    adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 50 de dano mas perdeu 15 de vida`)
                }else {
                    modificarVida("heroi", -15)
                    adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 50 de dano mas perdeu 15 de vida`)
                }
            }else {
                modificarVida("vilao", -50)
                modificarVida("heroi", -15)
                adicionarLog(`${heroi.nome} usou Hinokami Kagura em ${vilao.nome} e causou 50 de dano mas perdeu 15 de vida`)}
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
            setFugiu(false)
            setTurnoHeroi(true)
        }
    }

    const acoesVilao = {
        atacar: () => {
            if(heroi.vida < 20){
                modificarVida("heroi", 0 - heroi.vida)
                adicionarLog(`${vilao.nome} atacou ${heroi.nome} e causou ${0 - heroi.vida} de dano`)
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
        if (!turnoHeroi || !jogoAtivo) return

        acoesHeroi[acao]?.()
        setTurnoHeroi(false)

        setTimeout(() => {
            if (!jogoAtivo || vilao.vida <= 0 || heroi.vida <= 0) {return}

            let opcoes = Object.keys(acoesVilao)

            if (vilao.vida > 50) {
                opcoes = opcoes.filter(opcao => opcao !== "cura")
            }

            const escolha = opcoes[Math.floor(Math.random() * opcoes.length)]
            acoesVilao[escolha]?.()
            setTurnoHeroi(true)
        },1000)
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