package com.tavant.springproject.service;

import java.util.Arrays;

import com.google.gson.JsonObject;
import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;

public class SendMsg {

	public void pubnubSendMg(String message, String number) {
		PNConfiguration pnConfiguration = new PNConfiguration();
		pnConfiguration.setSubscribeKey("sub-c-f9083fda-31a5-11e8-99cd-4eb19ce3dd59");
		pnConfiguration.setPublishKey("pub-c-3c09a2d7-8a07-4637-943c-5653739c2ded");
		// System.out.println("...........");

		PubNub pubnub = new PubNub(pnConfiguration);
		JsonObject messageJsonObject = new JsonObject();
		messageJsonObject.addProperty("to", number);
		messageJsonObject.addProperty("body", message);
		// messageJsonObject.addProperty("body", "A/c 3XXXXX3306 credited by
		// RS.23,000 Total Bal:RS 71,519 CR Clr Bal:RS 71,519 CR Visit branch to
		// seed Aadhaar in Account");
System.out.println(messageJsonObject);
System.out.println("send");

		final String channelName = "Cheffin";
		// System.out.println( messageJsonObject);
		// System.out.println( messageJsonObject);
		
		pubnub.publish().message(messageJsonObject).channel(channelName).async(new PNCallback<PNPublishResult>() {
			@Override
			public void onResponse(PNPublishResult result, PNStatus status) {
				// handle publish result, status always present, result if
				// successful
				// status.isError to see if error happened
			}
		});
	}

}