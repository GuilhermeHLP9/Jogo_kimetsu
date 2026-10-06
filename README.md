# Jogo Kimetsu

Jogo Kimetsu e um simulador de batalha em turnos inspirado em Demon Slayer. O jogador controla Tanjiro Kamado em uma luta contra Muzan Kibutsuji, escolhendo acoes de combate enquanto o inimigo responde automaticamente no turno seguinte.

O projeto foi desenvolvido como estudo de gerenciamento de estado no React, separacao de regras de jogo em hook customizado, renderizacao condicional, controle de turnos, exibicao de logs e atualizacao visual da interface conforme a vida dos personagens muda.

## Estado atual

- Aplicacao web criada com Next.js.
- Batalha funcional entre Tanjiro e Muzan.
- Logica principal centralizada no hook `useGameManager`.
- Turnos alternados entre jogador e inimigo.
- Barras de vida dinamicas para os dois personagens.
- Tela de vitoria, derrota ou fuga.
- Botao para reiniciar a partida.
- Imagens dos personagens carregadas pela pasta `public`.

## Funcionalidades

### Jogador

- Controla Tanjiro durante o proprio turno.
- Pode atacar usando Respiracao da Agua.
- Pode usar o especial Hinokami Kagura.
- Pode recuperar vida com a acao Respiracao.
- Pode fugir da batalha.
- Nao consegue agir durante o turno do inimigo ou depois do fim do jogo.

### Inimigo

- Muzan joga automaticamente depois da acao do jogador.
- Pode atacar Tanjiro.
- Pode errar o ataque.
- Pode se curar quando a vida esta abaixo de 50 HP.
- Possui uma pequena espera antes de agir, simulando resposta do adversario.

### Combate

- Tanjiro inicia com 100 HP.
- Muzan inicia com 200 HP.
- Ataque comum causa 15 de dano em Muzan.
- Especial causa 40 de dano em Muzan e tira 15 HP de Tanjiro.
- Respiracao recupera ate 15 HP, respeitando o limite maximo de 100.
- Ataque de Muzan causa 20 de dano em Tanjiro.
- Cura de Muzan recupera 10 HP.

### Interface

- Campo de batalha com os dois personagens.
- Barras de HP com cores diferentes para vida normal, baixa e critica.
- Historico com os ultimos eventos da luta.
- Indicador de turno.
- Modal de fim de jogo para vitoria, derrota ou fuga.

## Stack utilizada

- Next.js 15
- React 19
- JavaScript
- CSS Modules
- ESLint
- Hooks do React

## Estrutura do projeto

```text
gamemanager/
|- app/
|  |- layout.js             # Layout geral da aplicacao
|  |- page.js               # Tela principal da batalha
|  |- page.module.css       # Estilos da interface do jogo
|  |- globals.css           # Estilos globais
|  \- favicon.ico
|- hooks/
|  \- gameManager.js        # Regras do jogo, turnos, acoes e logs
|- public/
|  \- images/               # Imagens de Tanjiro e Muzan
|- package.json             # Scripts e dependencias
|- next.config.mjs
|- eslint.config.mjs
\- README.md
```

## Fluxo da batalha

```text
Jogador escolhe uma acao
        |
        v
Acao de Tanjiro altera HP ou estado do jogo
        |
        v
Turno do jogador e bloqueado
        |
        v
Muzan escolhe uma acao automaticamente
        |
        v
Turno volta para o jogador
```

O jogo termina quando Tanjiro perde toda a vida, Muzan perde toda a vida ou o jogador escolhe fugir.

## Rodando localmente

Entre na pasta do projeto:

```powershell
cd "C:\Users\guilh\Desktop\ADS\5Quinto Semestre\Next\gamemanager"
```

Instale as dependencias:

```powershell
npm install
```

Inicie o servidor de desenvolvimento:

```powershell
npm run dev
```

Abra no navegador:

```text
http://localhost:3000
```

## Scripts disponiveis

```text
npm run dev      # Inicia o projeto em modo desenvolvimento
npm run build    # Gera a build de producao
npm run start    # Executa a build de producao
npm run lint     # Executa a verificacao do ESLint
```

## Checklist de teste

- Abrir o jogo em `http://localhost:3000`.
- Usar Atacar e confirmar reducao do HP de Muzan.
- Usar Especial e confirmar dano em Muzan e perda de HP de Tanjiro.
- Usar Respiracao e confirmar que Tanjiro nao passa de 100 HP.
- Aguardar o turno de Muzan e confirmar a acao automatica.
- Testar o botao Fugir.
- Testar uma vitoria contra Muzan.
- Testar uma derrota para Muzan.
- Reiniciar a partida pela tela de fim de jogo.

## Proximas melhorias

- Adicionar animacoes para os golpes.
- Adicionar efeitos sonoros.
- Criar tela inicial.
- Adicionar mais personagens jogaveis.
- Criar novas habilidades para Tanjiro.
- Melhorar a inteligencia artificial do inimigo.
- Salvar historico ou pontuacao das partidas.
