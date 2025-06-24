async function baixarVideo() {
  const url = document.getElementById('url').value;
  if (!url) {
    mostrarMensagem('Por favor, insira uma URL.');
    return;
  }
  
  mostrarMensagem('Preparando download do vídeo...');
  
  try {
    const response = await fetch('http://10.142.227.144:5000/download/video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarMensagem('Erro ao baixar vídeo.');
      console.log(erro.error)
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
    const response = await fetch('http://10.142.227.144:5000/download/audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarMensagem('Erro ao baixar áudio.');
      console.log(erro.error)
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

function pmae() {
  const element = document.getElementById("pmae");
  
  if (element.innerText === "Grátis!") {
    element.innerText = "Para Mamãe, Eu te amo muito ❤";
  } else {
    element.innerText = "Grátis!";
  }
}
