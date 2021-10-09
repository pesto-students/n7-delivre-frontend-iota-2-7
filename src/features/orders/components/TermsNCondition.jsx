import React from 'react'
import { Div } from '../../../shared/components/Div'
import { Label } from '../../../shared/components/Label'
import { Span } from '../../../shared/components/Span'

function TermsNCondition() {
    return (
        <Div width="auto">
        <Span>
          By Clicking 'Submit order' you are forwarding your request to
          couriers and agree to Our Terms and Conditions along with the
          clauses of the agreements SMS notifications can be set after
          sending an order.
        </Span>
        <Span>
          To order a delivery boy just follow these simple steps:
        </Span>
        <Span>
          <ol>
            <li>
              <Label size="medium">
                Provide us with necessary details: addresses, phone
                numbersat each address, desired time of delivery, weight
                of the delivery
              </Label>
            </li>
            <li>
              If you like our quote, then click 'Submit order' button
            </li>
            <li>
              <Label>
                Receive a call from the delivery boy assigned for your
                order. Negotiate, at which point he will be paid. Give him
                more details about your parcel and desired process.
              </Label>
            </li>
            <li>
              <Label>
                Send us a message or call our Operator in case of any
                doubt. You will get the Operator's number by clicking
                'Order' button, save it with your order's number
              </Label>
            </li>
            <li>
              <Label>
                Get your delivery performed. Give the Courier signature
                right on his smartphone's screen to verify, that all have
                been done properly
              </Label>
            </li>
          </ol>
        </Span>
        <Span>
          -You may rate a courier after the delivery is done to help us
          assign just best couriers. Best regards, Delivre team
        </Span>
      </Div>
    )
}

export default TermsNCondition
