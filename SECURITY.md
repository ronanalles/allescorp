# Política de segurança

## Escopo atual

Este repositório contém uma demonstração estática do AllesCorp. Todos os nomes, documentos, pedidos, saldos e valores exibidos são fictícios. A demonstração não possui autenticação real, banco de dados, emissão fiscal ou conexão ativa com marketplaces.

## Informações que nunca devem ser versionadas

- senhas, tokens OAuth, chaves de API e cookies;
- certificados digitais A1 ou respectivas senhas;
- arquivos `.env`, backups e dumps de banco;
- XMLs fiscais, boletos, CNABs ou relatórios reais;
- CPF, CNPJ, endereço, telefone ou e-mail de clientes reais;
- credenciais do Mercado Livre, Shopee, bancos ou provedores fiscais.

Use apenas referências para um cofre de segredos. Caso um segredo seja publicado, remova-o do provedor imediatamente, revogue/rotacione a credencial e só depois limpe o histórico Git. Apagar apenas o arquivo não invalida um segredo já exposto.

## Relato responsável

Não publique vulnerabilidades como issue. Entre em contato de forma privada com o proprietário do repositório, informando o impacto, os passos mínimos para reprodução e uma sugestão de correção. Não inclua dados pessoais ou credenciais no relato.

## Produção

Esta demonstração não deve receber dados reais. Uma implantação produtiva exige backend privado, autenticação forte, autorização por função e empresa, banco PostgreSQL protegido, trilha de auditoria, armazenamento privado, rate limiting, backups testados e revisão fiscal/contábil.
