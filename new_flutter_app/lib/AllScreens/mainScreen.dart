import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:new_flutter_app/Divider.dart';

class MainScreen extends StatefulWidget {

  static const String idScreen = "main";

  @override
  _MainScreenState createState() => _MainScreenState();
}


class _MainScreenState extends State<MainScreen> {

  Completer<GoogleMapController> _controller = Completer();
  late GoogleMapController newGoogleMapController;

  static final CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Main Screen"),
      ),
      body: Stack(
        children: [
          GoogleMap(
            mapType: MapType.normal,
            myLocationButtonEnabled: true,
            initialCameraPosition: _kGooglePlex,
            onMapCreated: (GoogleMapController controller){
              _controller.complete(controller);
              newGoogleMapController =controller;
            },
          ),

          Positioned(
            left: 0.0,
            right: 0.0,
            bottom: 0.0,
            child: Container(
              height: 320.0,
              decoration:  BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(topLeft: Radius.circular(18.0), topRight: Radius.circular(18.0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black,
                    blurRadius: 16.0,
                    spreadRadius: 0.5,
                    offset: Offset(0.7,0.7),
                  ),
                ],
              ),
              child: Column(
                children: [
                  SizedBox(height: 6.0),
                  Text("Hi there,", style:  TextStyle(fontSize: 12.0),),
                  Text("where to?,", style: TextStyle(fontSize: 20.0, fontFamily: "Brand Bold"),),
                  SizedBox(height: 20.0),
                  Container(
                    decoration:  BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(topLeft: Radius.circular(18.0), topRight: Radius.circular(18.0)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black54,
                          blurRadius: 6.0,
                          spreadRadius: 0.5,
                          offset: Offset(0.7,0.7),
                        ),
                      ],
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Row(
                        children: [
                          Icon(Icons.search,color: Colors.yellowAccent,),
                          SizedBox(width: 10.0,),
                          Text("Search Drop OFF")
                        ],
                      ),
                    ),
                  ),

                  SizedBox(height: 24.0,),
                  Row(
                    children: [
                      Icon(Icons.home,color: Colors.grey),
                      SizedBox(width: 12.0,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Add Name"),
                          SizedBox(height: 4.2,),
                          Text("Your living address",style: TextStyle(color: Colors.grey[200], fontSize: 12.0),)
                        ],
                      ),
                    ],
                  ),

                  SizedBox(height: 10.0,),

                  DividerWidth(),

                  SizedBox(height: 10.0,),

                  Row(
                    children: [
                      Icon(Icons.car_rental,color: Colors.grey),
                      SizedBox(width: 12.0,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Add Name"),
                          SizedBox(height: 4.2,),
                          Text("Your select vehicle",style: TextStyle(color: Colors.black54, fontSize: 12.0),)
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
