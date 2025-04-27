async function baixarVideo() {
  const url = document.getElementById('url').value;
  if (!url) {
    mostrarMensagem('Por favor, insira uma URL.');
    return;
  }
  
  mostrarMensagem('Preparando download do vídeo...');
  
  try {
    const response = await fetch('https://tubedrop.up.railway.app/download/video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarMensagem(erro.error || 'Erro ao baixar vídeo.');
      return;
    }

    const data = await response.json();
    baixarArquivo(data.filename, data.filedata, data.mimetype);

    
    setTimeout(() => {
      mostrarMensagem('Download do vídeo pronto!');
    }, 500); 
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro na requisição.');
  }
}

async function baixarAudio() {
  const url = document.getElementById('url').value;
  if (!url) {
    mostrarMensagem('Por favor, insira uma URL.');
    return;
  }

  mostrarMensagem('Preparando download do áudio...');
  
  try {
    const response = await fetch('https://tubedrop.up.railway.app/download/audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarMensagem(erro.error || 'Erro ao baixar áudio.');
      return;
    }

    const data = await response.json();
    baixarArquivo(data.filename, data.filedata, data.mimetype);

    setTimeout(() => {
      mostrarMensagem('Download do áudio pronto!');
    }, 500);
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro na requisição.');
  }
}

function baixarArquivo(nome, arquivoBase64, tipo) {
  const byteCharacters = atob(arquivoBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: tipo });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = nome;
  link.click();
}

function mostrarMensagem(mensagem) {
  const mensagemElemento = document.getElementById('mensagem');
  mensagemElemento.innerText = mensagem;
}



function inspiracao() {
  const element = document.getElementById("inspiracao");
  
  if (element.innerText === "TubeDrop") {
    element.innerText = "Fiz o site para ajudar a Manu quando ela precisar baixar algo do YouTube de novo ❤";
  } else {
    element.innerText = "TubeDrop";
  }
}