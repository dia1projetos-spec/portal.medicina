# MedicinaARG v2.0.0

## 📁 Estrutura
```
medv2/
├── index.html          ← Página principal (pública)
├── admin.html          ← Painel do administrador 🔐
├── css/main.css
├── js/main.js
└── images/             ← Todas as mídias aqui
```

## 🔧 CONFIGURAR FIREBASE (obrigatório)

Abra o arquivo `admin.html` e localize o bloco:
```js
const firebaseConfig = {
  apiKey:            "SUA_API_KEY",
  authDomain:        "SEU_PROJETO.firebaseapp.com",
  ...
};
```
Substitua pelos dados do seu projeto Firebase.

## 🔐 Regras de Acesso

No Firestore, crie uma coleção `admins` com um documento cujo ID seja o UID do seu usuário admin.
Isso garante que só você acessa o painel.

## ✅ Funcionalidades do Painel Admin

### 👥 Usuários
- Cadastrar aluno (nome, email, WhatsApp, ano)
- Editar / desativar / excluir aluno
- Cada aluno tem sua própria página de acesso

### 💳 Financeiro
- Lançar faturas por aluno
- Marcar como pago / em aberto
- Histórico completo por aluno

### 📚 Matérias & Conteúdos
- Criar matéria por ano (1° ao 6°)
- Adicionar vídeos, áudios, podcasts e PDFs
- URL do ImgBB ou qualquer link direto
- Definir ordem de exibição
- Permitir ou bloquear download (áudio/podcast)

## 🚀 Deploy Vercel
Push no GitHub → Vercel detecta automaticamente.
