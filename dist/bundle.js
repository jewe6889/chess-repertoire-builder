(()=>{"use strict";const r="Result";class n{constructor(r=""){this.clear();const n=r.match(/\[([^\]]+)]/g);if(n&&n.length>0)for(let r=0;r<n.length;r++){let e=n[r].match(/\[(\w+)\s+"([^"]+)"/);e&&(this.tags[e[1]]=e[2])}}clear(){this.tags={}}render(){let r="";for(const n in this.tags)r+=`[${n} "${this.tags[n]}"]\n`;return r}}function e(r,n,t,o){this.message=r,this.expected=n,this.found=t,this.location=o,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}function t(r,n){n=void 0!==n?n:{};var t,o,i,u,a={},l={pgn:ce},c=ce,f=function(r,n){var e=n||[];return e.unshift(r),e},s=function(r,n){var e=n||[];return e.unshift(r),e},h=function(){return[[]]},p=function(r){return r},v=function(r){return r},g=function(r,n,e,t,o,i,u,a){var l=a||[],c={turn:"w"};return c.moveNumber=n,c.notation=t,c.commentBefore=e,c.commentAfter=i,c.commentMove=r,c.variations=u||[],c.nag=o||null,l.unshift(c),l},d=function(r,n,e,t,o,i,u,a){var l=a||[],c={turn:"b"};return c.moveNumber=n,c.notation=t,c.commentBefore=e,c.commentAfter=i,c.variations=u||[],l.unshift(c),c.nag=o||null,l},m="1:0",A=oe("1:0",!1),b=function(){return["1:0"]},C="0:1",E=oe("0:1",!1),y=function(){return["0:1"]},_="1-0",w=oe("1-0",!1),S=function(){return["1-0"]},x="0-1",T=oe("0-1",!1),R=function(){return["0-1"]},$="1/2-1/2",I=oe("1/2-1/2",!1),O=function(){return["1/2-1/2"]},k="*",P=oe("*",!1),L=function(){return["*"]},N=/^[^}]/,q=ie(["}"],!0,!1),D=function(r){return r.join("").trim()},U="{",M=oe("{",!1),Q="}",K=oe("}",!1),j=function(r,n,e){var t=n||[];return t.unshift(r),t},B=function(r,n){var e=n||[];return e.unshift(r),e},F="(",W=oe("(",!1),G=")",z=oe(")",!1),Z=".",H=oe(".",!1),J=function(r){return r},V={type:"other",description:"integer"},X=/^[0-9]/,Y=ie([["0","9"]],!1,!1),rr=function(r){return parseInt(r.join(""),10)},nr=" ",er=oe(" ",!1),tr=function(){return""},or=function(r,n,e,t,o,i,u){var a={};return a.fig=r||null,a.disc=n||null,a.strike=e||null,a.col=t,a.row=o,a.check=u||null,a.promotion=i,a.notation=(r||"")+(n||"")+(e||"")+t+o+(i||"")+(u||""),a},ir=function(r,n,e,t,o,i,u,a){var l={};return l.fig=r||null,l.strike="x"==t?t:null,l.col=o,l.row=i,l.check=a||null,l.notation=(r&&"P"!==r?r:"")+n+e+("x"==t?t:"-")+o+i+(u||"")+(a||""),l.promotion=u,l},ur=function(r,n,e,t,o,i){var u={};return u.fig=r||null,u.strike=n||null,u.col=e,u.row=t,u.check=i||null,u.notation=(r||"")+(n||"")+e+t+(o||"")+(i||""),u.promotion=o,u},ar="O-O-O",lr=oe("O-O-O",!1),cr=function(r){var n={};return n.notation="O-O-O"+(r||""),n.check=r||null,n},fr="O-O",sr=oe("O-O",!1),hr=function(r){var n={};return n.notation="O-O"+(r||""),n.check=r||null,n},pr="+-",vr=oe("+-",!1),gr="+",dr=oe("+",!1),mr=function(r){return r[1]},Ar="$$$",br=oe("$$$",!1),Cr="#",Er=oe("#",!1),yr="=",_r=oe("=",!1),wr=function(r){return"="+r},Sr=function(r,n){var e=n||[];return e.unshift(r),e},xr="$",Tr=oe("$",!1),Rr=function(r){return"$"+r},$r="!!",Ir=oe("!!",!1),Or=function(){return"$3"},kr="??",Pr=oe("??",!1),Lr=function(){return"$4"},Nr="!?",qr=oe("!?",!1),Dr=function(){return"$5"},Ur="?!",Mr=oe("?!",!1),Qr=function(){return"$6"},Kr="!",jr=oe("!",!1),Br=function(){return"$1"},Fr="?",Wr=oe("?",!1),Gr=function(){return"$2"},zr="‼",Zr=oe("‼",!1),Hr="⁇",Jr=oe("⁇",!1),Vr="⁉",Xr=oe("⁉",!1),Yr="⁈",rn=oe("⁈",!1),nn="□",en=oe("□",!1),tn=function(){return"$7"},on=function(){return"$10"},un="∞",an=oe("∞",!1),ln=function(){return"$13"},cn="⩲",fn=oe("⩲",!1),sn=function(){return"$14"},hn="⩱",pn=oe("⩱",!1),vn=function(){return"$15"},gn="±",dn=oe("±",!1),mn=function(){return"$16"},An="∓",bn=oe("∓",!1),Cn=function(){return"$17"},En=function(){return"$18"},yn="-+",_n=oe("-+",!1),wn=function(){return"$19"},Sn="⨀",xn=oe("⨀",!1),Tn=function(){return"$22"},Rn="⟳",$n=oe("⟳",!1),In=function(){return"$32"},On="→",kn=oe("→",!1),Pn=function(){return"$36"},Ln="↑",Nn=oe("↑",!1),qn=function(){return"$40"},Dn="⇆",Un=oe("⇆",!1),Mn=function(){return"$132"},Qn="D",Kn=oe("D",!1),jn=function(){return"$220"},Bn=/^[RNBQKP]/,Fn=ie(["R","N","B","Q","K","P"],!1,!1),Wn=/^[a-h]/,Gn=ie([["a","h"]],!1,!1),zn=/^[1-8]/,Zn=ie([["1","8"]],!1,!1),Hn="x",Jn=oe("x",!1),Vn="-",Xn=oe("-",!1),Yn=0,re=[{line:1,column:1}],ne=0,ee=[],te=0;if("startRule"in n){if(!(n.startRule in l))throw new Error("Can't start parsing from rule \""+n.startRule+'".');c=l[n.startRule]}function oe(r,n){return{type:"literal",text:r,ignoreCase:n}}function ie(r,n,e){return{type:"class",parts:r,inverted:n,ignoreCase:e}}function ue(n){var e,t=re[n];if(t)return t;for(e=n-1;!re[e];)e--;for(t={line:(t=re[e]).line,column:t.column};e<n;)10===r.charCodeAt(e)?(t.line++,t.column=1):t.column++,e++;return re[n]=t,t}function ae(r,n){var e=ue(r),t=ue(n);return{start:{offset:r,line:e.line,column:e.column},end:{offset:n,line:t.line,column:t.column}}}function le(r){Yn<ne||(Yn>ne&&(ne=Yn,ee=[]),ee.push(r))}function ce(){var r,n,e;return r=Yn,(n=function(){var r;return Yn,(r=se())!==a&&(r=p(r)),r}())!==a?((e=he())===a&&(e=null),e!==a?r=n=f(n,e):(Yn=r,r=a)):(Yn=r,r=a),r===a&&(r=Yn,(n=fe())!==a?((e=se())===a&&(e=null),e!==a?r=n=s(n,e):(Yn=r,r=a)):(Yn=r,r=a),r===a&&(r=Yn,(n=Ce())===a&&(n=null),n!==a&&(n=h()),r=n)),r}function fe(){var r;return Yn,(r=he())!==a&&(r=v(r)),r}function se(){var n,e,t,o,i,u,l,c,f,s,h,p,v,d,m,A;return n=Yn,(e=Ce())===a&&(e=null),e!==a?((t=ve())===a&&(t=null),t!==a?((o=Ce())===a&&(o=null),o!==a?(i=function(){var n,e,t;return n=Yn,(e=be())!==a?(46===r.charCodeAt(Yn)?(t=Z,Yn++):(t=a,0===te&&le(H)),t===a&&(t=null),t!==a?n=e=J(e):(Yn=n,n=a)):(Yn=n,n=a),n}(),i===a&&(i=null),i!==a?((u=Ce())===a&&(u=null),u!==a?((l=ve())===a&&(l=null),l!==a?((c=Ce())===a&&(c=null),c!==a&&(f=Ee())!==a?((s=Ce())===a&&(s=null),s!==a?((h=we())===a&&(h=null),h!==a?((p=Ce())===a&&(p=null),p!==a?((v=ve())===a&&(v=null),v!==a?((d=Ce())===a&&(d=null),d!==a?((m=ge())===a&&(m=null),m!==a?((A=he())===a&&(A=null),A!==a?n=e=g(t,i,l,f,h,v,m,A):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a),n===a&&(n=pe()),n}function he(){var r,n,e,t,o,i,u,l,c,f,s,h,p,v,g,m;return r=Yn,(n=Ce())===a&&(n=null),n!==a?((e=ve())===a&&(e=null),e!==a?((t=Ce())===a&&(t=null),t!==a?((o=xe())===a&&(o=null),o!==a?((i=Ce())===a&&(i=null),i!==a?((u=ve())===a&&(u=null),u!==a?((l=Ce())===a&&(l=null),l!==a&&(c=Ee())!==a?((f=Ce())===a&&(f=null),f!==a?((s=we())===a&&(s=null),s!==a?((h=Ce())===a&&(h=null),h!==a?((p=ve())===a&&(p=null),p!==a?((v=Ce())===a&&(v=null),v!==a?((g=de())===a&&(g=null),g!==a?((m=se())===a&&(m=null),m!==a?r=n=d(e,o,u,c,s,p,g,m):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a),r===a&&(r=pe()),r}function pe(){var n,e;return n=Yn,r.substr(Yn,3)===m?(e=m,Yn+=3):(e=a,0===te&&le(A)),e!==a&&(e=b()),(n=e)===a&&(n=Yn,r.substr(Yn,3)===C?(e=C,Yn+=3):(e=a,0===te&&le(E)),e!==a&&(e=y()),(n=e)===a&&(n=Yn,r.substr(Yn,3)===_?(e=_,Yn+=3):(e=a,0===te&&le(w)),e!==a&&(e=S()),(n=e)===a&&(n=Yn,r.substr(Yn,3)===x?(e=x,Yn+=3):(e=a,0===te&&le(T)),e!==a&&(e=R()),(n=e)===a&&(n=Yn,r.substr(Yn,7)===$?(e=$,Yn+=7):(e=a,0===te&&le(I)),e!==a&&(e=O()),(n=e)===a&&(n=Yn,42===r.charCodeAt(Yn)?(e=k,Yn++):(e=a,0===te&&le(P)),e!==a&&(e=L()),n=e))))),n}function ve(){var n,e,t,o;if(n=Yn,e=function(){var n;return 123===r.charCodeAt(Yn)?(n=U,Yn++):(n=a,0===te&&le(M)),n}(),e!==a){for(t=[],N.test(r.charAt(Yn))?(o=r.charAt(Yn),Yn++):(o=a,0===te&&le(q));o!==a;)t.push(o),N.test(r.charAt(Yn))?(o=r.charAt(Yn),Yn++):(o=a,0===te&&le(q));t!==a?(o=function(){var n;return 125===r.charCodeAt(Yn)?(n=Q,Yn++):(n=a,0===te&&le(K)),n}(),o!==a?n=e=D(t):(Yn=n,n=a)):(Yn=n,n=a)}else Yn=n,n=a;return n}function ge(){var r,n,e,t,o,i;return r=Yn,me()!==a&&(n=se())!==a&&Ae()!==a?((e=Ce())===a&&(e=null),e!==a?((t=ge())===a&&(t=null),t!==a?((o=Ce())===a&&(o=null),o!==a?((i=xe())===a&&(i=null),i!==a?r=j(n,t,i):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a),r}function de(){var r,n,e,t;return r=Yn,me()!==a&&(n=fe())!==a&&Ae()!==a?((e=Ce())===a&&(e=null),e!==a?((t=de())===a&&(t=null),t!==a?r=B(n,t):(Yn=r,r=a)):(Yn=r,r=a)):(Yn=r,r=a),r}function me(){var n;return 40===r.charCodeAt(Yn)?(n=F,Yn++):(n=a,0===te&&le(W)),n}function Ae(){var n;return 41===r.charCodeAt(Yn)?(n=G,Yn++):(n=a,0===te&&le(z)),n}function be(){var n,e,t;if(te++,n=Yn,e=[],X.test(r.charAt(Yn))?(t=r.charAt(Yn),Yn++):(t=a,0===te&&le(Y)),t!==a)for(;t!==a;)e.push(t),X.test(r.charAt(Yn))?(t=r.charAt(Yn),Yn++):(t=a,0===te&&le(Y));else e=a;return e!==a&&(e=rr(e)),te--,(n=e)===a&&(e=a,0===te&&le(V)),n}function Ce(){var n,e;if(Yn,n=[],32===r.charCodeAt(Yn)?(e=nr,Yn++):(e=a,0===te&&le(er)),e!==a)for(;e!==a;)n.push(e),32===r.charCodeAt(Yn)?(e=nr,Yn++):(e=a,0===te&&le(er));else n=a;return n!==a&&(n=tr()),n}function Ee(){var n,e,t,o,i,u,l,c,f;return n=Yn,(e=Te())===a&&(e=null),e!==a?(t=Yn,te++,o=function(){var r,n,e,t,o;return r=Yn,(n=Se())!==a?((e=Ie())===a&&(e=null),e!==a&&(t=Re())!==a&&(o=$e())!==a?r=n=[n,e,t,o]:(Yn=r,r=a)):(Yn=r,r=a),r}(),te--,o!==a?(Yn=t,t=void 0):t=a,t!==a&&(o=Se())!==a?((i=Ie())===a&&(i=null),i!==a&&(u=Re())!==a&&(l=$e())!==a?((c=_e())===a&&(c=null),c!==a?((f=ye())===a&&(f=null),f!==a?n=e=or(e,o,i,u,l,c,f):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a),n===a&&(n=Yn,(e=Te())===a&&(e=null),e!==a&&(t=Re())!==a&&(o=$e())!==a?(i=function(){var n;return 120===r.charCodeAt(Yn)?(n=Hn,Yn++):(n=a,0===te&&le(Jn)),n===a&&(45===r.charCodeAt(Yn)?(n=Vn,Yn++):(n=a,0===te&&le(Xn))),n}(),i===a&&(i=null),i!==a&&(u=Re())!==a&&(l=$e())!==a?((c=_e())===a&&(c=null),c!==a?((f=ye())===a&&(f=null),f!==a?n=e=ir(e,t,o,i,u,l,c,f):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a),n===a&&(n=Yn,(e=Te())===a&&(e=null),e!==a?((t=Ie())===a&&(t=null),t!==a&&(o=Re())!==a&&(i=$e())!==a?((u=_e())===a&&(u=null),u!==a?((l=ye())===a&&(l=null),l!==a?n=e=ur(e,t,o,i,u,l):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a),n===a&&(n=Yn,r.substr(Yn,5)===ar?(e=ar,Yn+=5):(e=a,0===te&&le(lr)),e!==a?((t=ye())===a&&(t=null),t!==a?n=e=cr(t):(Yn=n,n=a)):(Yn=n,n=a),n===a&&(n=Yn,r.substr(Yn,3)===fr?(e=fr,Yn+=3):(e=a,0===te&&le(sr)),e!==a?((t=ye())===a&&(t=null),t!==a?n=e=hr(t):(Yn=n,n=a)):(Yn=n,n=a))))),n}function ye(){var n,e,t,o;return n=Yn,e=Yn,t=Yn,te++,r.substr(Yn,2)===pr?(o=pr,Yn+=2):(o=a,0===te&&le(vr)),te--,o===a?t=void 0:(Yn=t,t=a),t!==a?(43===r.charCodeAt(Yn)?(o=gr,Yn++):(o=a,0===te&&le(dr)),o!==a?e=t=[t,o]:(Yn=e,e=a)):(Yn=e,e=a),e!==a&&(e=mr(e)),(n=e)===a&&(n=Yn,e=Yn,t=Yn,te++,r.substr(Yn,3)===Ar?(o=Ar,Yn+=3):(o=a,0===te&&le(br)),te--,o===a?t=void 0:(Yn=t,t=a),t!==a?(35===r.charCodeAt(Yn)?(o=Cr,Yn++):(o=a,0===te&&le(Er)),o!==a?e=t=[t,o]:(Yn=e,e=a)):(Yn=e,e=a),e!==a&&(e=mr(e)),n=e),n}function _e(){var n,e,t;return n=Yn,61===r.charCodeAt(Yn)?(e=yr,Yn++):(e=a,0===te&&le(_r)),e!==a&&(t=Te())!==a?n=e=wr(t):(Yn=n,n=a),n}function we(){var n,e,t,o;return n=Yn,e=function(){var n,e,t;return n=Yn,36===r.charCodeAt(Yn)?(e=xr,Yn++):(e=a,0===te&&le(Tr)),e!==a&&(t=be())!==a?n=e=Rr(t):(Yn=n,n=a),n===a&&(n=Yn,r.substr(Yn,2)===$r?(e=$r,Yn+=2):(e=a,0===te&&le(Ir)),e!==a&&(e=Or()),(n=e)===a&&(n=Yn,r.substr(Yn,2)===kr?(e=kr,Yn+=2):(e=a,0===te&&le(Pr)),e!==a&&(e=Lr()),(n=e)===a&&(n=Yn,r.substr(Yn,2)===Nr?(e=Nr,Yn+=2):(e=a,0===te&&le(qr)),e!==a&&(e=Dr()),(n=e)===a&&(n=Yn,r.substr(Yn,2)===Ur?(e=Ur,Yn+=2):(e=a,0===te&&le(Mr)),e!==a&&(e=Qr()),(n=e)===a&&(n=Yn,33===r.charCodeAt(Yn)?(e=Kr,Yn++):(e=a,0===te&&le(jr)),e!==a&&(e=Br()),(n=e)===a&&(n=Yn,63===r.charCodeAt(Yn)?(e=Fr,Yn++):(e=a,0===te&&le(Wr)),e!==a&&(e=Gr()),(n=e)===a&&(n=Yn,8252===r.charCodeAt(Yn)?(e=zr,Yn++):(e=a,0===te&&le(Zr)),e!==a&&(e=Or()),(n=e)===a&&(n=Yn,8263===r.charCodeAt(Yn)?(e=Hr,Yn++):(e=a,0===te&&le(Jr)),e!==a&&(e=Lr()),(n=e)===a&&(n=Yn,8265===r.charCodeAt(Yn)?(e=Vr,Yn++):(e=a,0===te&&le(Xr)),e!==a&&(e=Dr()),(n=e)===a&&(n=Yn,8264===r.charCodeAt(Yn)?(e=Yr,Yn++):(e=a,0===te&&le(rn)),e!==a&&(e=Qr()),(n=e)===a&&(n=Yn,9633===r.charCodeAt(Yn)?(e=nn,Yn++):(e=a,0===te&&le(en)),e!==a&&(e=tn()),(n=e)===a&&(n=Yn,61===r.charCodeAt(Yn)?(e=yr,Yn++):(e=a,0===te&&le(_r)),e!==a&&(e=on()),(n=e)===a&&(n=Yn,8734===r.charCodeAt(Yn)?(e=un,Yn++):(e=a,0===te&&le(an)),e!==a&&(e=ln()),(n=e)===a&&(n=Yn,10866===r.charCodeAt(Yn)?(e=cn,Yn++):(e=a,0===te&&le(fn)),e!==a&&(e=sn()),(n=e)===a&&(n=Yn,10865===r.charCodeAt(Yn)?(e=hn,Yn++):(e=a,0===te&&le(pn)),e!==a&&(e=vn()),(n=e)===a&&(n=Yn,177===r.charCodeAt(Yn)?(e=gn,Yn++):(e=a,0===te&&le(dn)),e!==a&&(e=mn()),(n=e)===a&&(n=Yn,8723===r.charCodeAt(Yn)?(e=An,Yn++):(e=a,0===te&&le(bn)),e!==a&&(e=Cn()),(n=e)===a&&(n=Yn,r.substr(Yn,2)===pr?(e=pr,Yn+=2):(e=a,0===te&&le(vr)),e!==a&&(e=En()),(n=e)===a&&(n=Yn,r.substr(Yn,2)===yn?(e=yn,Yn+=2):(e=a,0===te&&le(_n)),e!==a&&(e=wn()),(n=e)===a&&(n=Yn,10752===r.charCodeAt(Yn)?(e=Sn,Yn++):(e=a,0===te&&le(xn)),e!==a&&(e=Tn()),(n=e)===a&&(n=Yn,10227===r.charCodeAt(Yn)?(e=Rn,Yn++):(e=a,0===te&&le($n)),e!==a&&(e=In()),(n=e)===a&&(n=Yn,8594===r.charCodeAt(Yn)?(e=On,Yn++):(e=a,0===te&&le(kn)),e!==a&&(e=Pn()),(n=e)===a&&(n=Yn,8593===r.charCodeAt(Yn)?(e=Ln,Yn++):(e=a,0===te&&le(Nn)),e!==a&&(e=qn()),(n=e)===a&&(n=Yn,8646===r.charCodeAt(Yn)?(e=Dn,Yn++):(e=a,0===te&&le(Un)),e!==a&&(e=Mn()),(n=e)===a&&(n=Yn,68===r.charCodeAt(Yn)?(e=Qn,Yn++):(e=a,0===te&&le(Kn)),e!==a&&(e=jn()),n=e))))))))))))))))))))))))),n}(),e!==a?((t=Ce())===a&&(t=null),t!==a?((o=we())===a&&(o=null),o!==a?n=e=Sr(e,o):(Yn=n,n=a)):(Yn=n,n=a)):(Yn=n,n=a),n}function Se(){var r;return(r=Re())===a&&(r=$e()),r}function xe(){var n,e,t,o;if(n=Yn,(e=be())!==a){if(t=[],46===r.charCodeAt(Yn)?(o=Z,Yn++):(o=a,0===te&&le(H)),o!==a)for(;o!==a;)t.push(o),46===r.charCodeAt(Yn)?(o=Z,Yn++):(o=a,0===te&&le(H));else t=a;t!==a?n=e=J(e):(Yn=n,n=a)}else Yn=n,n=a;return n}function Te(){var n;return Bn.test(r.charAt(Yn))?(n=r.charAt(Yn),Yn++):(n=a,0===te&&le(Fn)),n}function Re(){var n;return Wn.test(r.charAt(Yn))?(n=r.charAt(Yn),Yn++):(n=a,0===te&&le(Gn)),n}function $e(){var n;return zn.test(r.charAt(Yn))?(n=r.charAt(Yn),Yn++):(n=a,0===te&&le(Zn)),n}function Ie(){var n;return 120===r.charCodeAt(Yn)?(n=Hn,Yn++):(n=a,0===te&&le(Jn)),n}if((t=c())!==a&&Yn===r.length)return t;throw t!==a&&Yn<r.length&&le({type:"end"}),o=ee,i=ne<r.length?r.charAt(ne):null,u=ne<r.length?ae(ne,ne+1):ae(ne,ne),new e(e.buildMessage(o,i),o,i,u)}!function(r,n){function e(){this.constructor=r}e.prototype=n.prototype,r.prototype=new e}(e,Error),e.buildMessage=function(r,n){var e={literal:function(r){return'"'+o(r.text)+'"'},class:function(r){var n,e="";for(n=0;n<r.parts.length;n++)e+=r.parts[n]instanceof Array?i(r.parts[n][0])+"-"+i(r.parts[n][1]):i(r.parts[n]);return"["+(r.inverted?"^":"")+e+"]"},any:function(r){return"any character"},end:function(r){return"end of input"},other:function(r){return r.description}};function t(r){return r.charCodeAt(0).toString(16).toUpperCase()}function o(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(r){return"\\x0"+t(r)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(r){return"\\x"+t(r)}))}function i(r){return r.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(r){return"\\x0"+t(r)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(r){return"\\x"+t(r)}))}return"Expected "+function(r){var n,t,o,i=new Array(r.length);for(n=0;n<r.length;n++)i[n]=(o=r[n],e[o.type](o));if(i.sort(),i.length>0){for(n=1,t=1;n<i.length;n++)i[n-1]!==i[n]&&(i[t]=i[n],t++);i.length=t}switch(i.length){case 1:return i[0];case 2:return i[0]+" or "+i[1];default:return i.slice(0,-1).join(", ")+", or "+i[i.length-1]}}(r)+" but "+function(r){return r?'"'+o(r)+'"':"end of input"}(n)+" found."};class o{static parse(r,n){return t(r,n)}}const i="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",u=["1-0","0-1","1/2-1/2","*"],a={b:[16,32,17,15],w:[-16,-32,-17,-15]},l={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},c=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],f=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],s={p:0,n:1,b:2,r:3,q:4,k:5},h={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},p={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},v={w:[{square:p.a1,flag:h.QSIDE_CASTLE},{square:p.h1,flag:h.KSIDE_CASTLE}],b:[{square:p.a8,flag:h.QSIDE_CASTLE},{square:p.h8,flag:h.KSIDE_CASTLE}]};function g(r){var n=r.charAt(0);if(n>="a"&&n<="h"){if(r.match(/[a-h]\d.*[a-h]\d/))return;return x}return"o"===(n=n.toLowerCase())?R:n}function d(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}function m(r){return r>>4}function A(r){return 15&r}function b(r){var n=A(r),e=m(r);return"abcdefgh".substring(n,n+1)+"87654321".substring(e,e+1)}function C(r){return r===w?_:w}function E(r){var n=r instanceof Array?[]:{};for(var e in r)n[e]="object"==typeof e?E(r[e]):r[e];return n}function y(r){return r.replace(/^\s+|\s+$/g,"")}const _="b",w="w",S=-1,x="p",T="b",R="k",$=(function(){for(var r=[],n=p.a8;n<=p.h1;n++)136&n?n+=7:r.push(b(n))}(),{NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"}),I=function(r){var n=new Array(128),e={w:S,b:S},t=w,o={w:0,b:0},I=S,O=0,k=1,P=[],L={},N={};function q(r){void 0===r&&(r=!1),n=new Array(128),e={w:S,b:S},t=w,o={w:0,b:0},I=S,O=0,k=1,P=[],r||(L={}),N={},B(K())}function D(){for(var r=[],n={},e=function(r){r in N&&(n[r]=N[r])};P.length>0;)r.push(tr());for(e(K());r.length>0;)er(r.pop()),e(K());N=n}function U(){M(i)}function M(r,n){void 0===n&&(n=!1);var e=r.split(/\s+/),i=e[0],u=0;if(!Q(r).valid)return!1;q(n);for(var a=0;a<i.length;a++){var l=i.charAt(a);if("/"===l)u+=8;else if(-1!=="0123456789".indexOf(l))u+=parseInt(l,10);else{var c=l<"a"?w:_;W({type:l.toLowerCase(),color:c},b(u)),u++}}return t=e[1],e[2].indexOf("K")>-1&&(o.w|=h.KSIDE_CASTLE),e[2].indexOf("Q")>-1&&(o.w|=h.QSIDE_CASTLE),e[2].indexOf("k")>-1&&(o.b|=h.KSIDE_CASTLE),e[2].indexOf("q")>-1&&(o.b|=h.QSIDE_CASTLE),I="-"===e[3]?S:p[e[3]],O=parseInt(e[4],10),k=parseInt(e[5],10),B(K()),!0}function Q(r){var n=r.split(/\s+/);if(6!==n.length)return{valid:!1,error_number:1,error:"FEN string must contain six space-delimited fields."};if(isNaN(parseInt(n[5]))||parseInt(n[5],10)<=0)return{valid:!1,error_number:2,error:"6th field (move number) must be a positive integer."};if(isNaN(parseInt(n[4]))||parseInt(n[4],10)<0)return{valid:!1,error_number:3,error:"5th field (half move counter) must be a non-negative integer."};if(!/^(-|[abcdefgh][36])$/.test(n[3]))return{valid:!1,error_number:4,error:"4th field (en-passant square) is invalid."};if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(n[2]))return{valid:!1,error_number:5,error:"3rd field (castling availability) is invalid."};if(!/^(w|b)$/.test(n[1]))return{valid:!1,error_number:6,error:"2nd field (side to move) is invalid."};var e=n[0].split("/");if(8!==e.length)return{valid:!1,error_number:7,error:"1st field (piece positions) does not contain 8 '/'-delimited rows."};for(var t=0;t<e.length;t++){for(var o=0,i=!1,u=0;u<e[t].length;u++)if(isNaN(e[t][u])){if(!/^[prnbqkPRNBQK]$/.test(e[t][u]))return{valid:!1,error_number:9,error:"1st field (piece positions) is invalid [invalid piece]."};o+=1,i=!1}else{if(i)return{valid:!1,error_number:8,error:"1st field (piece positions) is invalid [consecutive numbers]."};o+=parseInt(e[t][u],10),i=!0}if(8!==o)return{valid:!1,error_number:10,error:"1st field (piece positions) is invalid [row too large]."}}return"3"==n[3][1]&&"w"==n[1]||"6"==n[3][1]&&"b"==n[1]?{valid:!1,error_number:11,error:"Illegal en-passant square"}:{valid:!0,error_number:0,error:"No errors."}}function K(){for(var r=0,e="",i=p.a8;i<=p.h1;i++){if(null==n[i])r++;else{r>0&&(e+=r,r=0);var u=n[i].color,a=n[i].type;e+=u===w?a.toUpperCase():a.toLowerCase()}i+1&136&&(r>0&&(e+=r),i!==p.h1&&(e+="/"),r=0,i+=8)}var l="";o[w]&h.KSIDE_CASTLE&&(l+="K"),o[w]&h.QSIDE_CASTLE&&(l+="Q"),o[_]&h.KSIDE_CASTLE&&(l+="k"),o[_]&h.QSIDE_CASTLE&&(l+="q"),l=l||"-";var c=I===S?"-":b(I);return[e,t,l,c,O,k].join(" ")}function j(r){for(var n=0;n<r.length;n+=2)"string"==typeof r[n]&&"string"==typeof r[n+1]&&(L[r[n]]=r[n+1]);return L}function B(r){P.length>0||(r!==i?(L.SetUp="1",L.FEN=r):(delete L.SetUp,delete L.FEN))}function F(r){var e=n[p[r]];return e?{type:e.type,color:e.color}:null}function W(r,t){if(!("type"in r)||!("color"in r))return!1;if(-1==="pnbrqkPNBRQK".indexOf(r.type.toLowerCase()))return!1;if(!(t in p))return!1;var o=p[t];return(r.type!=R||e[r.color]==S||e[r.color]==o)&&(n[o]={type:r.type,color:r.color},r.type===R&&(e[r.color]=o),B(K()),!0)}function G(r,n,e,o,i){var u={color:t,from:n,to:e,flags:o,piece:r[n].type};return i&&(u.flags|=h.PROMOTION,u.promotion=i),r[e]?u.captured=r[e].type:o&h.EP_CAPTURE&&(u.captured=x),u}function z(r){function i(r,n,e,t,o){if(r[e].type!==x||0!==m(t)&&7!==m(t))n.push(G(r,e,t,o));else for(var i=["q","r",T,"n"],u=0,a=i.length;u<a;u++)n.push(G(r,e,t,o,i[u]))}var u=[],c=t,f=C(c),s={b:1,w:6},v=p.a8,g=p.h1,d=!1,A=void 0===r||!("legal"in r)||r.legal,b=void 0===r||!("piece"in r)||"string"!=typeof r.piece||r.piece.toLowerCase();if(void 0!==r&&"square"in r){if(!(r.square in p))return[];v=g=p[r.square],d=!0}for(var E=v;E<=g;E++)if(136&E)E+=7;else{var y=n[E];if(null!=y&&y.color===c)if(y.type!==x||!0!==b&&b!==x){if(!0===b||b===y.type)for(var _=0,w=l[y.type].length;_<w;_++){var S=l[y.type][_];for($=E;!(136&($+=S));){if(null!=n[$]){if(n[$].color===c)break;i(n,u,E,$,h.CAPTURE);break}if(i(n,u,E,$,h.NORMAL),"n"===y.type||"k"===y.type)break}}}else{var $=E+a[c][0];if(null==n[$]){i(n,u,E,$,h.NORMAL);$=E+a[c][1];s[c]===m(E)&&null==n[$]&&i(n,u,E,$,h.BIG_PAWN)}for(_=2;_<4;_++)136&($=E+a[c][_])||(null!=n[$]&&n[$].color===f?i(n,u,E,$,h.CAPTURE):$===I&&i(n,u,E,I,h.EP_CAPTURE))}}if(!(!0!==b&&b!==R||d&&g!==e[c])){if(o[c]&h.KSIDE_CASTLE){var O=(k=e[c])+2;null!=n[k+1]||null!=n[O]||H(f,e[c])||H(f,k+1)||H(f,O)||i(n,u,e[c],O,h.KSIDE_CASTLE)}var k;if(o[c]&h.QSIDE_CASTLE)O=(k=e[c])-2,null!=n[k-1]||null!=n[k-2]||null!=n[k-3]||H(f,e[c])||H(f,k-1)||H(f,O)||i(n,u,e[c],O,h.QSIDE_CASTLE)}if(!A)return u;var P=[];for(E=0,w=u.length;E<w;E++)er(u[E]),J(c)||P.push(u[E]),tr();return P}function Z(r,n){var e="";if(r.flags&h.KSIDE_CASTLE)e="O-O";else if(r.flags&h.QSIDE_CASTLE)e="O-O-O";else{if(r.piece!==x){var t=function(r,n){for(var e=r.from,t=r.to,o=r.piece,i=0,u=0,a=0,l=0,c=n.length;l<c;l++){var f=n[l].from,s=n[l].to;o===n[l].piece&&e!==f&&t===s&&(i++,m(e)===m(f)&&u++,A(e)===A(f)&&a++)}return i>0?u>0&&a>0?b(e):a>0?b(e).charAt(1):b(e).charAt(0):""}(r,n);e+=r.piece.toUpperCase()+t}r.flags&(h.CAPTURE|h.EP_CAPTURE)&&(r.piece===x&&(e+=b(r.from)[0]),e+="x"),e+=b(r.to),r.flags&h.PROMOTION&&(e+="="+r.promotion.toUpperCase())}return er(r),V()&&(X()?e+="#":e+="+"),tr(),e}function H(r,e){for(var t=p.a8;t<=p.h1;t++)if(136&t)t+=7;else if(null!=n[t]&&n[t].color===r){var o=n[t],i=t-e,u=i+119;if(c[u]&1<<s[o.type]){if(o.type===x){if(i>0){if(o.color===w)return!0}else if(o.color===_)return!0;continue}if("n"===o.type||"k"===o.type)return!0;for(var a=f[u],l=t+a,h=!1;l!==e;){if(null!=n[l]){h=!0;break}l+=a}if(!h)return!0}}return!1}function J(r){return H(C(r),e[r])}function V(){return J(t)}function X(){return V()&&0===z().length}function Y(){return!V()&&0===z().length}function rr(){for(var r={},e=[],t=0,o=0,i=p.a8;i<=p.h1;i++)if(o=(o+1)%2,136&i)i+=7;else{var u=n[i];u&&(r[u.type]=u.type in r?r[u.type]+1:1,u.type===T&&e.push(o),t++)}if(2===t)return!0;if(3===t&&(1===r[T]||1===r.n))return!0;if(t===r[T]+2){var a=0,l=e.length;for(i=0;i<l;i++)a+=e[i];if(0===a||a===l)return!0}return!1}function nr(){for(var r=[],n={},e=!1;;){var t=tr();if(!t)break;r.push(t)}for(;;){var o=K().split(" ").slice(0,4).join(" ");if(n[o]=o in n?n[o]+1:1,n[o]>=3&&(e=!0),!r.length)break;er(r.pop())}return e}function er(r){var i=t,u=C(i);if(function(r){P.push({move:r,kings:{b:e.b,w:e.w},turn:t,castling:{b:o.b,w:o.w},ep_square:I,half_moves:O,move_number:k})}(r),n[r.to]=n[r.from],n[r.from]=null,r.flags&h.EP_CAPTURE&&(t===_?n[r.to-16]=null:n[r.to+16]=null),r.flags&h.PROMOTION&&(n[r.to]={type:r.promotion,color:i}),n[r.to].type===R){if(e[n[r.to].color]=r.to,r.flags&h.KSIDE_CASTLE){var a=r.to-1,l=r.to+1;n[a]=n[l],n[l]=null}else r.flags&h.QSIDE_CASTLE&&(a=r.to+1,l=r.to-2,n[a]=n[l],n[l]=null);o[i]=""}if(o[i])for(var c=0,f=v[i].length;c<f;c++)if(r.from===v[i][c].square&&o[i]&v[i][c].flag){o[i]^=v[i][c].flag;break}if(o[u])for(c=0,f=v[u].length;c<f;c++)if(r.to===v[u][c].square&&o[u]&v[u][c].flag){o[u]^=v[u][c].flag;break}I=r.flags&h.BIG_PAWN?"b"===t?r.to-16:r.to+16:S,r.piece===x||r.flags&(h.CAPTURE|h.EP_CAPTURE)?O=0:O++,t===_&&k++,t=C(t)}function tr(){var r=P.pop();if(null==r)return null;var i=r.move;e=r.kings,t=r.turn,o=r.castling,I=r.ep_square,O=r.half_moves,k=r.move_number;var u,a,l=t,c=C(t);if(n[i.from]=n[i.to],n[i.from].type=i.piece,n[i.to]=null,i.flags&h.CAPTURE)n[i.to]={type:i.captured,color:c};else if(i.flags&h.EP_CAPTURE){var f;f=l===_?i.to-16:i.to+16,n[f]={type:x,color:c}}return i.flags&(h.KSIDE_CASTLE|h.QSIDE_CASTLE)&&(i.flags&h.KSIDE_CASTLE?(u=i.to+1,a=i.to-1):i.flags&h.QSIDE_CASTLE&&(u=i.to-2,a=i.to+1),n[u]=n[a],n[a]=null),i}function or(r,n){for(var e=d(r),t=0;t<2;t++){if(1==t){if(!n)return null;var o=!1;if(c=e.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/)){var i=c[1],u=c[2],a=c[3],l=c[4];1==u.length&&(o=!0)}else{var c;(c=e.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/))&&(i=c[1],u=c[2],a=c[3],l=c[4],1==u.length&&(o=!0))}}for(var f=g(e),s=z({legal:!0,piece:i||f}),h=0,v=s.length;h<v;h++)switch(t){case 0:if(e===d(Z(s[h],s)))return s[h];break;case 1:if(c){if(!(i&&i.toLowerCase()!=s[h].piece||p[u]!=s[h].from||p[a]!=s[h].to||l&&l.toLowerCase()!=s[h].promotion))return s[h];if(o){var m=b(s[h].from);if(!(i&&i.toLowerCase()!=s[h].piece||p[a]!=s[h].to||u!=m[0]&&u!=m[1]||l&&l.toLowerCase()!=s[h].promotion))return s[h]}}}}return null}function ir(r){var n=E(r);n.san=Z(n,z({legal:!0})),n.to=b(n.to),n.from=b(n.from);var e="";for(var t in h)h[t]&n.flags&&(e+=$[t]);return n.flags=e,n}function ur(r){for(var n=z({legal:!1}),e=0,o=t,i=0,u=n.length;i<u;i++)er(n[i]),J(o)||(r-1>0?e+=ur(r-1):e++),tr();return e}return M(void 0===r?i:r),{load:function(r){return M(r)},reset:function(){return U()},moves:function(r){for(var n=z(r),e=[],t=0,o=n.length;t<o;t++)void 0!==r&&"verbose"in r&&r.verbose?e.push(ir(n[t])):e.push(Z(n[t],z({legal:!0})));return e},in_check:function(){return V()},in_checkmate:function(){return X()},in_stalemate:function(){return Y()},in_draw:function(){return O>=100||Y()||rr()||nr()},insufficient_material:function(){return rr()},in_threefold_repetition:function(){return nr()},game_over:function(){return O>=100||X()||Y()||rr()||nr()},validate_fen:function(r){return Q(r)},fen:function(){return K()},board:function(){for(var r=[],e=[],t=p.a8;t<=p.h1;t++)null==n[t]?e.push(null):e.push({square:b(t),type:n[t].type,color:n[t].color}),t+1&136&&(r.push(e),e=[],t+=8);return r},pgn:function(r){var n="object"==typeof r&&"string"==typeof r.newline_char?r.newline_char:"\n",e="object"==typeof r&&"number"==typeof r.max_width?r.max_width:0,t=[],o=!1;for(var i in L)t.push("["+i+' "'+L[i]+'"]'+n),o=!0;o&&P.length&&t.push(n);for(var u=function(r){var n=N[K()];return void 0!==n&&(r=`${r}${r.length>0?" ":""}{${n}}`),r},a=[];P.length>0;)a.push(tr());var l=[],c="";for(0===a.length&&l.push(u(""));a.length>0;){c=u(c);var f=a.pop();if(P.length||"b"!==f.color)"w"===f.color&&(c.length&&l.push(c),c=k+".");else{const r=`${k}. ...`;c=c?`${c} ${r}`:r}c=c+" "+Z(f,z({legal:!0})),er(f)}if(c.length&&l.push(u(c)),void 0!==L.Result&&l.push(L.Result),0===e)return t.join("")+l.join(" ");var s=function(){return t.length>0&&" "===t[t.length-1]&&(t.pop(),!0)},h=function(r,o){for(var i of o.split(" "))if(i){if(r+i.length>e){for(;s();)r--;t.push(n),r=0}t.push(i),r+=i.length,t.push(" "),r++}return s()&&r--,r},p=0;for(i=0;i<l.length;i++)p+l[i].length>e&&l[i].includes("{")?p=h(p,l[i]):(p+l[i].length>e&&0!==i?(" "===t[t.length-1]&&t.pop(),t.push(n),p=0):0!==i&&(t.push(" "),p++),t.push(l[i]),p+=l[i].length);return t.join("")},load_pgn:function(r,n){var e=void 0!==n&&"sloppy"in n&&n.sloppy;function t(r){return r.replace(/\\/g,"\\")}r=r.trim();var o="object"==typeof n&&"string"==typeof n.newline_char?n.newline_char:"\r?\n",i=new RegExp("^(\\[((?:"+t(o)+")|.)*\\])(?:\\s*"+t(o)+"){2}"),a=i.test(r)?i.exec(r)[1]:"";U();var l=function(r,n){for(var e="object"==typeof n&&"string"==typeof n.newline_char?n.newline_char:"\r?\n",o={},i=r.split(new RegExp(t(e))),u="",a="",l=0;l<i.length;l++){var c=/^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;u=i[l].replace(c,"$1"),a=i[l].replace(c,"$2"),y(u).length>0&&(o[u]=a)}return o}(a,n),c="";for(var f in l)"fen"===f.toLowerCase()&&(c=l[f]),j([f,l[f]]);if(e){if(c&&!M(c,!0))return!1}else if(!("1"!==l.SetUp||"FEN"in l&&M(l.FEN,!0)))return!1;for(var s=function(r){return`{${function(r){return Array.from(r).map((function(r){return r.charCodeAt(0)<128?r.charCodeAt(0).toString(16):encodeURIComponent(r).replace(/\%/g,"").toLowerCase()})).join("")}((r=r.replace(new RegExp(t(o),"g")," ")).slice(1,r.length-1))}}`},h=function(r){if(r.startsWith("{")&&r.endsWith("}"))return function(r){return 0==r.length?"":decodeURIComponent("%"+r.match(/.{1,2}/g).join("%"))}(r.slice(1,r.length-1))},p=r.replace(a,"").replace(new RegExp(`({[^}]*})+?|;([^${t(o)}]*)`,"g"),(function(r,n,e){return void 0!==n?s(n):" "+s(`{${e.slice(1)}}`)})).replace(new RegExp(t(o),"g")," "),v=/(\([^\(\)]+\))+?/g;v.test(p);)p=p.replace(v,"");var g=y(p=(p=(p=p.replace(/\d+\.(\.\.)?/g,"")).replace(/\.\.\./g,"")).replace(/\$\d+/g,"")).split(new RegExp(/\s+/));g=g.join(",").replace(/,,+/g,",").split(",");for(var d="",m="",A=0;A<g.length;A++){var b=h(g[A]);if(void 0===b)if(null==(d=or(g[A],e))){if(!(u.indexOf(g[A])>-1))return!1;m=g[A]}else m="",er(d);else N[K()]=b}return m&&Object.keys(L).length&&!L.Result&&j(["Result",m]),!0},header:function(){return j(arguments)},turn:function(){return t},move:function(r,n){var e=void 0!==n&&"sloppy"in n&&n.sloppy,t=null;if("string"==typeof r)t=or(r,e);else if("object"==typeof r)for(var o=z(),i=0,u=o.length;i<u;i++)if(r.from===b(o[i].from)&&r.to===b(o[i].to)&&(!("promotion"in o[i])||r.promotion===o[i].promotion)){t=o[i];break}if(!t)return null;var a=ir(t);return er(t),a},undo:function(){var r=tr();return r?ir(r):null},clear:function(){return q()},put:function(r,n){return W(r,n)},get:function(r){return F(r)},ascii(){for(var r="   +------------------------+\n",e=p.a8;e<=p.h1;e++){if(0===A(e)&&(r+=" "+"87654321"[m(e)]+" |"),null==n[e])r+=" . ";else{var t=n[e].type;r+=" "+(n[e].color===w?t.toUpperCase():t.toLowerCase())+" "}e+1&136&&(r+="|\n",e+=8)}return(r+="   +------------------------+\n")+"     a  b  c  d  e  f  g  h"},remove:function(r){return function(r){var t=F(r);return n[p[r]]=null,t&&t.type===R&&(e[t.color]=S),B(K()),t}(r)},perft:function(r){return ur(r)},square_color:function(r){if(r in p){var n=p[r];return(m(n)+A(n))%2==0?"light":"dark"}return null},history:function(r){for(var n=[],e=[],t=(void 0!==r&&"verbose"in r&&r.verbose);P.length>0;)n.push(tr());for(;n.length>0;){var o=n.pop();t?e.push(ir(o)):e.push(Z(o,z({legal:!0}))),er(o)}return e},get_comment:function(){return N[K()]},set_comment:function(r){N[K()]=r.replace("{","[").replace("}","]")},delete_comment:function(){var r=N[K()];return delete N[K()],r},get_comments:function(){return D(),Object.keys(N).map((function(r){return{fen:r,comment:N[r]}}))},delete_comments:function(){return D(),Object.keys(N).map((function(r){var n=N[r];return delete N[r],{fen:r,comment:n}}))}}};function O(r,n){this.fen=r,this.notation=n,this.toString=function(){return"IllegalMoveException: "+r+" => "+n}}class k{constructor(r=undefined,n=undefined,e=!1){if(r){const t=o.parse(r.replace(/\s\s+/g," ").replace(/\n/g," "));this.moves=this.traverse(t[0],n,void 0,1,e)}else this.clear();this.setUpFen=n}clear(){this.moves=[]}traverse(r,n,e=undefined,t=1,o=!1){const i=n?new I(n):new I,u=[];let a=e;for(let e of r){if(e.notation){const r=e.notation.notation,l=i.move(r,{sloppy:o});if(!l)throw new O(i.fen(),r);{a?(l.previous=a,a.next=l):l.previous=void 0,l.ply=t,this.fillMoveFromChessState(l,i),e.nag&&(l.nag=e.nag[0]),e.commentBefore&&(l.commentBefore=e.commentBefore),e.commentMove&&(l.commentMove=e.commentMove),e.commentAfter&&(l.commentAfter=e.commentAfter),l.variations=[];const r=e.variations;if(r.length>0){const e=u.length>0?u[u.length-1].fen:n;for(let n of r)l.variations.push(this.traverse(n,e,a,t,o))}l.variation=u,u.push(l),a=l}}t++}return u}fillMoveFromChessState(r,n){r.fen=n.fen(),r.variations=[],n.game_over()&&(r.gameOver=!0,n.in_draw()&&(r.inDraw=!0),n.in_stalemate()&&(r.inStalemate=!0),n.insufficient_material()&&(r.insufficientMaterial=!0),n.in_threefold_repetition()&&(r.inThreefoldRepetition=!0),n.in_checkmate()&&(r.inCheckmate=!0)),n.in_check()&&(r.inCheck=!0)}historyToMove(r){const n=[];let e=r;for(n.push(e);e.previous;)n.push(e.previous),e=e.previous;return n.reverse()}validateMove(r,n=undefined,e=!0){n||this.moves.length>0&&(n=this.moves[this.moves.length-1]);const t=new I(this.setUpFen?this.setUpFen:void 0);if(n){const r=this.historyToMove(n);for(const n of r)t.move(n)}const o=t.move(r,{sloppy:e});return o&&this.fillMoveFromChessState(o,t),o}addMove(r,n=undefined,e=!0){n||this.moves.length>0&&(n=this.moves[this.moves.length-1]);const t=this.validateMove(r,n,e);if(!t)throw new Error("invalid move");return n?(t.previous=n,t.ply=n.ply+1,n.next?(n.next.variations.push([]),t.variation=n.next.variations[n.next.variations.length-1],t.variation.push(t)):(n.next=t,t.variation=n.variation,n.variation.push(t))):(t.variation=this.moves,t.ply=1,this.moves.push(t)),t}render(r=!0,n=!0){const e=(t,o=!1)=>{let i="";for(let u of t){if(u.ply%2==1?i+=Math.floor(u.ply/2)+1+". ":(0===i.length||o)&&(i+=u.ply/2+"... "),o=!1,n&&u.nag&&(i+="$"+u.nag+" "),r&&u.commentBefore&&(i+="{"+u.commentBefore+"} ",o=!0),i+=u.san+" ",r&&u.commentMove&&(i+="{"+u.commentMove+"} ",o=!0),r&&u.commentAfter&&(i+="{"+u.commentAfter+"} ",o=!0),u.variations.length>0)for(let r of u.variations)i+="("+e(r)+") ",o=!0;i+=" "}return i};let t=e(this.moves);return t=t.replace(/\s+\)/g,")"),t=t.replace(/\s\s+/g," ").trim(),t}}class P{constructor(r="",e={}){const t="]"===r.trim().slice(-1)?r.length:r.lastIndexOf("]\n\n")+1,o=r.substring(0,t),i=r.substring(t),u=!!e.sloppy;this.header=new n(o),"1"===this.header.tags.SetUp&&this.header.tags.FEN?this.history=new k(i,this.header.tags.FEN,u):this.history=new k(i,void 0,u)}wrap(r,n){const e=r.split(" ");let t=[],o="";for(let r=0;r<e.length;r++){const i=e[r];o.length+i.length<n?o+=i+" ":(t.push(o.trim()),o=i+" ")}return t.push(o.trim()),t.join("\n")}render(n=!0,e=!0,t=!0){const o=n?this.header.render()+"\n":"";let i=this.history.render(e,t);return this.header.tags[r]&&(i+=" "+this.header.tags[r]),o+this.wrap(i,80)}}document.querySelector("#show").addEventListener("click",(function(){alert("yolo"),new P(window.parent.document.querySelector("#repertoire").value),new P(window.parent.document.querySelector("#game").value)}))})();