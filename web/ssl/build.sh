#!/bin/sh

read_CF_Key() {
    read -p "输入Cloudflare key> " Key
    if [[ $Key != "" ]]; then
        export CF_Key=$Key
    else
        echo 'key不能为空'
        exit 1
    fi
}

read_CF_Email() {
    read -p "输入Cloudflare Email> " Email
    if [[ $Email != "" ]]; then
        export CF_Email=$Email
    else
        echo 'email不能为空'
        exit 1
    fi
}

read_Domain() {
    read -p "输入域名> " Domain

    if [[ $Domain != "" ]]; then
        export CF_Domain=$Domain
    else
        echo '域名不能为空'
        exit 1
    fi
}

sign() {
    echo '开始签发证书...'
    /$USER/.acme.sh/acme.sh --issue --dns dns_cf -d $CF_Domain

    echo '移动证书至ssl目录'
    cp /$USER/.acme.sh/${CF_Domain}/${CF_Domain}.key ./ca.key
    cp /$USER/.acme.sh/${CF_Domain}/fullchain.cer ./ca.cer
}

read_CF_Key
read_CF_Email
read_Domain
sign

