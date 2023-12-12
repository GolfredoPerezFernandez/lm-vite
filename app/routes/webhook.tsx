
export const action = async ({request}) => {
    const secret = 'whsec_...' // process.env.WEBHOOK_SIGNING_SECRET
    const sig = request.headers.get('stripe-signature')
    let event;
    const payload = await request.text()
    const payload2 = await request.result_url()

  console.log("request "+JSON.stringify(request))
  console.log("payload2 "+JSON.stringify(payload2))

  console.log("payload "+JSON.stringify(payload))

    try {
    } catch(err) {
      return new Response(err.message, {
        status: 400,
      })
    }
  
  
    return {};
  }